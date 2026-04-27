import { useEffect, useMemo, useState } from 'react';
import { lumimar } from '../../lib/supabase';

type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
type TicketStatus = 'open' | 'in_progress' | 'awaiting_owner' | 'resolved' | 'cancelled';

type Property = {
  id: string;
  name: string;
  location_label: string;
};

type Ticket = {
  id: string;
  property_id: string;
  title: string;
  description: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  estimated_cost: number | null;
  approval_required: boolean;
  approved_by_owner: boolean;
  created_at: string;
  properties?: Property | null;
};

const PRIORITY_CLASSES: Record<TicketPriority, string> = {
  low: 'bg-blue-50 text-blue-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-orange-50 text-orange-700',
  urgent: 'bg-rose-50 text-rose-700',
};

const STATUS_CLASSES: Record<TicketStatus, string> = {
  open: 'bg-surface-container text-on-surface-variant',
  in_progress: 'bg-amber-50 text-amber-700',
  awaiting_owner: 'bg-purple-50 text-purple-700',
  resolved: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-rose-50 text-rose-700',
};

function shortId(id: string) {
  return `TKT-${id.slice(0, 6).toUpperCase()}`;
}

function formatMoney(value: number | null) {
  if (!value) {
    return 'No estimate';
  }

  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InternalMaintenance() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | TicketStatus>('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState({
    property_id: '',
    title: '',
    description: '',
    priority: 'medium' as TicketPriority,
    estimated_cost: '',
    approval_required: false,
  });

  const loadData = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const [ticketsResult, propertiesResult] = await Promise.all([
      (lumimar as any)
        .from('maintenance_tickets')
        .select('*, properties(id, name, location_label)')
        .order('created_at', { ascending: false }),
      (lumimar as any).from('properties').select('id, name, location_label').order('name'),
    ]);

    if (ticketsResult.error) {
      setError(ticketsResult.error.message);
      setTickets([]);
    } else {
      setTickets((ticketsResult.data ?? []) as Ticket[]);
    }

    if (propertiesResult.error) {
      setError(propertiesResult.error.message);
      setProperties([]);
    } else {
      const nextProperties = (propertiesResult.data ?? []) as Property[];
      setProperties(nextProperties);
      setForm((current) => ({ ...current, property_id: current.property_id || nextProperties[0]?.id || '' }));
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredTickets = useMemo(
    () => tickets.filter((ticket) => statusFilter === 'all' || ticket.status === statusFilter),
    [tickets, statusFilter],
  );

  const totals = useMemo(
    () => ({
      open: tickets.filter((ticket) => ['open', 'in_progress', 'awaiting_owner'].includes(ticket.status)).length,
      urgent: tickets.filter((ticket) => ticket.priority === 'urgent').length,
      awaiting: tickets.filter((ticket) => ticket.status === 'awaiting_owner').length,
      resolved: tickets.filter((ticket) => ticket.status === 'resolved').length,
    }),
    [tickets],
  );

  const updateTicket = async (ticket: Ticket, updates: Partial<Pick<Ticket, 'status' | 'priority'>>) => {
    if (!lumimar) {
      return;
    }

    setSaving(ticket.id);
    setError(null);
    setNotice(null);

    const { error: updateError } = await (lumimar as any).from('maintenance_tickets').update(updates).eq('id', ticket.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setTickets((current) => current.map((item) => (item.id === ticket.id ? { ...item, ...updates } : item)));
      setNotice('Ticket updated.');
    }

    setSaving(null);
  };

  const createTicket = async () => {
    if (!lumimar) {
      return;
    }

    setSaving('new');
    setError(null);
    setNotice(null);

    const { error: insertError } = await (lumimar as any).from('maintenance_tickets').insert({
      property_id: form.property_id,
      title: form.title,
      description: form.description || null,
      priority: form.priority,
      estimated_cost: form.estimated_cost ? Number(form.estimated_cost) : null,
      approval_required: form.approval_required,
      status: form.approval_required ? 'awaiting_owner' : 'open',
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      setNotice('Maintenance ticket created.');
      setShowForm(false);
      setForm((current) => ({ ...current, title: '', description: '', estimated_cost: '', approval_required: false }));
      await loadData();
    }

    setSaving(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Maintenance</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Track repairs, approvals, and vendor dispatches.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void loadData()} className="rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary">
            Refresh
          </button>
          <button type="button" onClick={() => setShowForm((value) => !value)} className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-md">
            Create Ticket
          </button>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {notice ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

      {showForm ? (
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <select value={form.property_id} onChange={(event) => setForm({ ...form, property_id: event.target.value })} className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm">
              {properties.map((property) => (
                <option key={property.id} value={property.id}>{property.name}</option>
              ))}
            </select>
            <input type="text" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Issue title" className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm md:col-span-2" />
            <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as TicketPriority })} className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" className="mt-4 w-full rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input type="number" value={form.estimated_cost} onChange={(event) => setForm({ ...form, estimated_cost: event.target.value })} placeholder="Estimated cost" className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
            <label className="flex items-center gap-2 text-sm text-primary">
              <input type="checkbox" checked={form.approval_required} onChange={(event) => setForm({ ...form, approval_required: event.target.checked })} />
              Requires owner approval
            </label>
            <button type="button" onClick={() => void createTicket()} disabled={saving === 'new' || !form.property_id || !form.title} className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
              Save Ticket
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Open Tickets</p><h3 className="text-3xl font-bold text-primary">{totals.open}</h3></div>
        <div className="rounded-xl border-l-4 border-red-500 bg-surface-container-lowest p-6 shadow-ambient"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Urgent</p><h3 className="text-3xl font-bold text-red-600">{totals.urgent}</h3></div>
        <div className="rounded-xl border-l-4 border-amber-500 bg-surface-container-lowest p-6 shadow-ambient"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Awaiting Approval</p><h3 className="text-3xl font-bold text-amber-600">{totals.awaiting}</h3></div>
        <div className="rounded-xl border-l-4 border-emerald-500 bg-surface-container-lowest p-6 shadow-ambient"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Resolved</p><h3 className="text-3xl font-bold text-emerald-600">{totals.resolved}</h3></div>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-container/30 p-6">
          <h3 className="font-bold text-primary">Ticket Queue</h3>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | TicketStatus)} className="rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm">
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="awaiting_owner">Awaiting Owner</option>
            <option value="resolved">Resolved</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                <th className="p-6">Ticket</th>
                <th className="p-6">Property</th>
                <th className="p-6">Issue</th>
                <th className="p-6">Cost</th>
                <th className="p-6">Priority</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">Loading tickets...</td></tr>
              ) : filteredTickets.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">No tickets match this filter.</td></tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-6 text-sm font-mono text-on-surface-variant">{shortId(ticket.id)}</td>
                    <td className="p-6"><p className="text-sm font-bold text-primary">{ticket.properties?.name ?? 'Unknown property'}</p><p className="text-xs text-on-surface-variant">{ticket.properties?.location_label ?? ''}</p></td>
                    <td className="p-6"><p className="text-sm text-primary">{ticket.title}</p><p className="text-xs text-on-surface-variant">{ticket.description ?? 'No description'}</p></td>
                    <td className="p-6 text-sm">{formatMoney(ticket.estimated_cost)}</td>
                    <td className="p-6">
                      <select value={ticket.priority} disabled={saving === ticket.id} onChange={(event) => void updateTicket(ticket, { priority: event.target.value as TicketPriority })} className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${PRIORITY_CLASSES[ticket.priority]}`}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </td>
                    <td className="p-6">
                      <select value={ticket.status} disabled={saving === ticket.id} onChange={(event) => void updateTicket(ticket, { status: event.target.value as TicketStatus })} className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLASSES[ticket.status]}`}>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="awaiting_owner">Awaiting Owner</option>
                        <option value="resolved">Resolved</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
