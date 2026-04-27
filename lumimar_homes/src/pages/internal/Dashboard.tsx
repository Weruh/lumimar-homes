import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { lumimar } from '../../lib/supabase';

type LeadStage = 'new' | 'discovery' | 'site_visit' | 'proposal' | 'closing' | 'won' | 'lost';

type Lead = {
  id: string;
  name: string;
  location: string;
  stage: LeadStage;
  created_at: string;
};

type Property = {
  id: string;
  name: string;
  status: string;
};

type CleaningJob = {
  id: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_start: string;
  assigned_team: string | null;
  properties?: { name: string } | null;
};

type MaintenanceTicket = {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'awaiting_owner' | 'resolved' | 'cancelled';
  properties?: { name: string } | null;
};

type Payout = {
  gross_revenue: number;
  deductions: number;
  net_payout: number;
  status: string;
};

const STAGE_LABELS: Record<LeadStage, string> = {
  new: 'New',
  discovery: 'Discovery',
  site_visit: 'Site Visit',
  proposal: 'Proposal',
  closing: 'Closing',
  won: 'Won',
  lost: 'Lost',
};

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function InternalDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [cleaningJobs, setCleaningJobs] = useState<CleaningJob[]>([]);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const [leadsResult, propertiesResult, cleaningResult, ticketsResult, payoutsResult] = await Promise.all([
      (lumimar as any).from('lead_inquiries').select('id, name, location, stage, created_at').order('created_at', { ascending: false }),
      (lumimar as any).from('properties').select('id, name, status'),
      (lumimar as any)
        .from('cleaning_jobs')
        .select('id, status, scheduled_start, assigned_team, properties(name)')
        .order('scheduled_start', { ascending: true })
        .limit(8),
      (lumimar as any)
        .from('maintenance_tickets')
        .select('id, title, priority, status, properties(name)')
        .order('created_at', { ascending: false })
        .limit(8),
      (lumimar as any).from('payouts').select('gross_revenue, deductions, net_payout, status'),
    ]);

    const firstError = [leadsResult, propertiesResult, cleaningResult, ticketsResult, payoutsResult].find((result) => result.error)?.error;

    if (firstError) {
      setError(firstError.message);
    }

    setLeads((leadsResult.data ?? []) as Lead[]);
    setProperties((propertiesResult.data ?? []) as Property[]);
    setCleaningJobs((cleaningResult.data ?? []) as CleaningJob[]);
    setTickets((ticketsResult.data ?? []) as MaintenanceTicket[]);
    setPayouts((payoutsResult.data ?? []) as Payout[]);
    setLoading(false);
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const activeTickets = tickets.filter((ticket) => ['open', 'in_progress', 'awaiting_owner'].includes(ticket.status));
    return {
      newLeads: leads.filter((lead) => lead.stage === 'new').length,
      activeProperties: properties.filter((property) => property.status === 'active').length,
      pendingCleans: cleaningJobs.filter((job) => job.status === 'scheduled' || job.status === 'in_progress').length,
      urgentTickets: activeTickets.filter((ticket) => ticket.priority === 'urgent').length,
      grossRevenue: payouts.reduce((sum, payout) => sum + Number(payout.gross_revenue ?? 0), 0),
      netPayouts: payouts.reduce((sum, payout) => sum + Number(payout.net_payout ?? 0), 0),
      pendingPayouts: payouts.filter((payout) => payout.status === 'pending' || payout.status === 'approved').length,
    };
  }, [cleaningJobs, leads, payouts, properties, tickets]);

  const groupedLeads = useMemo(
    () =>
      (['new', 'discovery', 'site_visit', 'proposal', 'closing', 'won'] as LeadStage[]).map((stage) => ({
        stage,
        leads: leads.filter((lead) => lead.stage === stage).slice(0, 3),
      })),
    [leads],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Admin Dashboard</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Live overview of applicants, properties, operations, and finance.</p>
        </div>
        <button type="button" onClick={() => void loadDashboard()} className="rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary hover:bg-surface-container">
          Refresh
        </button>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {loading ? <p className="rounded-lg bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">Loading dashboard data...</p> : null}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/internal/leads" className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient transition-colors hover:bg-surface-container-low">
          <div className="mb-4 flex items-center justify-between"><span className="material-symbols-outlined text-primary">group_add</span><span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">Review</span></div>
          <p className="text-sm font-medium uppercase tracking-tighter text-on-surface-variant">New Applicants</p>
          <h2 className="mt-1 text-3xl font-bold text-primary font-headline">{stats.newLeads}</h2>
        </Link>
        <Link to="/internal/leads" className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient transition-colors hover:bg-surface-container-low">
          <div className="mb-4 flex items-center justify-between"><span className="material-symbols-outlined text-primary">holiday_village</span><span className="text-xs font-bold text-on-surface-variant/60">{properties.length} total</span></div>
          <p className="text-sm font-medium uppercase tracking-tighter text-on-surface-variant">Active Properties</p>
          <h2 className="mt-1 text-3xl font-bold text-primary font-headline">{stats.activeProperties}</h2>
        </Link>
        <Link to="/internal/cleaning" className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient transition-colors hover:bg-surface-container-low">
          <div className="mb-4 flex items-center justify-between"><span className="material-symbols-outlined text-primary">mop</span><span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">Today</span></div>
          <p className="text-sm font-medium uppercase tracking-tighter text-on-surface-variant">Pending Cleans</p>
          <h2 className="mt-1 text-3xl font-bold text-primary font-headline">{stats.pendingCleans}</h2>
        </Link>
        <Link to="/internal/maintenance" className="rounded-xl bg-primary p-6 text-white shadow-ambient transition-colors hover:bg-primary-container">
          <div className="mb-4 flex items-center justify-between"><span className="material-symbols-outlined">build</span><span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold">{stats.urgentTickets} urgent</span></div>
          <p className="text-sm font-medium uppercase tracking-tighter opacity-70">Maintenance Tickets</p>
          <h2 className="mt-1 text-3xl font-bold font-headline">{tickets.length}</h2>
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl bg-secondary-container p-8">
          <h3 className="mb-1 text-2xl text-primary font-headline">Revenue Snapshot</h3>
          <p className="mb-8 text-sm text-on-secondary-container">Current payout records</p>
          <div className="space-y-5">
            <div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase tracking-widest text-on-secondary-container/70">Gross Revenue</span><span className="text-xl font-bold text-primary">{formatMoney(stats.grossRevenue)}</span></div>
            <div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase tracking-widest text-on-secondary-container/70">Net Payouts</span><span className="text-xl font-bold text-primary">{formatMoney(stats.netPayouts)}</span></div>
            <div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase tracking-widest text-on-secondary-container/70">Pending Payouts</span><span className="text-xl font-bold text-primary">{stats.pendingPayouts}</span></div>
            <Link to="/internal/finance" className="block rounded-xl bg-primary py-4 text-center text-sm font-bold tracking-wide text-white shadow-lg">View Finance</Link>
          </div>
        </div>

        <div className="rounded-xl bg-surface-container-low p-8 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl text-primary font-headline">Applicant Pipeline</h3>
            <Link to="/internal/leads" className="text-sm font-bold text-primary hover:underline">Manage Leads</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {groupedLeads.slice(0, 6).map(({ stage, leads: stageLeads }) => (
              <div key={stage} className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{STAGE_LABELS[stage]}</p>
                {stageLeads.length === 0 ? (
                  <div className="rounded-lg bg-white/50 p-4 text-xs text-on-surface-variant">No applicants</div>
                ) : (
                  stageLeads.map((lead) => (
                    <div key={lead.id} className="rounded-lg border-l-4 border-primary bg-white p-4 shadow-sm">
                      <p className="text-xs font-bold text-primary">{lead.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{lead.location}</p>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
          <div className="mb-6 flex items-center justify-between"><h3 className="text-2xl text-primary font-headline">Cleaning Queue</h3><Link to="/internal/cleaning" className="text-sm font-bold text-primary hover:underline">Open</Link></div>
          <div className="space-y-4">
            {cleaningJobs.length === 0 ? <p className="text-sm text-on-surface-variant">No cleaning jobs scheduled.</p> : cleaningJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
                <div><p className="text-sm font-bold text-primary">{job.properties?.name ?? 'Unknown property'}</p><p className="text-xs text-on-surface-variant">{formatDate(job.scheduled_start)} · {job.assigned_team ?? 'Unassigned'}</p></div>
                <span className="text-xs font-bold uppercase text-on-surface-variant">{job.status.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-ambient">
          <div className="mb-6 flex items-center justify-between"><h3 className="text-2xl text-primary font-headline">Maintenance Queue</h3><Link to="/internal/maintenance" className="text-sm font-bold text-primary hover:underline">Open</Link></div>
          <div className="space-y-4">
            {tickets.length === 0 ? <p className="text-sm text-on-surface-variant">No maintenance tickets yet.</p> : tickets.slice(0, 5).map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
                <div><p className="text-sm font-bold text-primary">{ticket.title}</p><p className="text-xs text-on-surface-variant">{ticket.properties?.name ?? 'Unknown property'}</p></div>
                <span className="text-xs font-bold uppercase text-on-surface-variant">{ticket.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
