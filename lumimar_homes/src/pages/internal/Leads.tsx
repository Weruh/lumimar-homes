import { useEffect, useMemo, useState } from 'react';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { lumimar, supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Lead = Database['lumimar']['Tables']['lead_inquiries']['Row'];
type LeadStage = Database['lumimar']['Enums']['lead_stage'];

const STAGES: LeadStage[] = ['new', 'discovery', 'site_visit', 'proposal', 'closing', 'won', 'lost'];

const STAGE_LABELS: Record<LeadStage, string> = {
  new: 'New',
  discovery: 'Discovery',
  site_visit: 'Site Visit',
  proposal: 'Proposal',
  closing: 'Closing',
  won: 'Won',
  lost: 'Lost',
};

const STAGE_CLASSES: Record<LeadStage, string> = {
  new: 'bg-blue-50 text-blue-700',
  discovery: 'bg-cyan-50 text-cyan-700',
  site_visit: 'bg-purple-50 text-purple-700',
  proposal: 'bg-amber-50 text-amber-700',
  closing: 'bg-orange-50 text-orange-700',
  won: 'bg-emerald-50 text-emerald-700',
  lost: 'bg-rose-50 text-rose-700',
};

const SERVICE_LABELS: Record<string, string> = {
  'full-management': 'Full Management',
  'co-hosting': 'Co-Hosting',
  'long-term': 'Long-Term / Monthly Stays',
  'interior-styling': 'Interior Styling & Property Setup',
  estimate: 'Free Revenue Estimate',
};

const EARNINGS_LABELS: Record<string, string> = {
  'not-rented': 'Not currently rented',
  'under-50k': 'Under KES 50,000 / month',
  '50k-100k': 'KES 50,000 - 100,000 / month',
  '100k-200k': 'KES 100,000 - 200,000 / month',
  '200k-plus': 'KES 200,000+ / month',
  unsure: 'Unsure',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function stringifyFunctionDetail(value: unknown) {
  if (value instanceof Error) {
    return value.message;
  }

  if (typeof value === 'string') {
    return value.trim() === '{}' ? '' : value;
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const knownMessage = [record.error, record.message, record.details, record.hint]
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0 && item.trim() !== '{}')
      .join(' ');

    if (knownMessage) {
      return knownMessage;
    }

    const serialized = JSON.stringify(value);
    return serialized === '{}' ? '' : serialized;
  }

  return '';
}

async function readFunctionError(error: FunctionsHttpError) {
  try {
    const response = error.context as Response;
    const text = await response.clone().text();
    const body = text ? JSON.parse(text) : null;
    const message = stringifyFunctionDetail(body);

    return message || error.message || `Invite request failed with HTTP ${response.status}.`;
  } catch {
    return error.message || 'Invite request failed. Check the function logs for details.';
  }
}

export default function InternalLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | LeadStage>('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadLeads = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: leadsError } = await lumimar
      .from('lead_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (leadsError) {
      setError(leadsError.message);
      setLeads([]);
    } else {
      setLeads(data ?? []);
      setSelectedLeadId((current) => current ?? data?.[0]?.id ?? null);
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
      const matchesSearch =
        !query ||
        [lead.name, lead.email, lead.phone, lead.location, lead.service]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      return matchesStage && matchesSearch;
    });
  }, [leads, search, stageFilter]);

  const selectedLead = useMemo(
    () => filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null,
    [filteredLeads, selectedLeadId],
  );

  const totals = useMemo(() => {
    return STAGES.reduce(
      (acc, stage) => {
        acc[stage] = leads.filter((lead) => lead.stage === stage).length;
        return acc;
      },
      {} as Record<LeadStage, number>,
    );
  }, [leads]);

  const updateLeadStage = async (lead: Lead, stage: LeadStage) => {
    if (!lumimar || lead.stage === stage) {
      return;
    }

    setSaving(lead.id);
    setError(null);
    setNotice(null);

    const { error: updateError } = await lumimar.from('lead_inquiries').update({ stage }).eq('id', lead.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setLeads((current) => current.map((item) => (item.id === lead.id ? { ...item, stage } : item)));
      setNotice(`${lead.name} moved to ${STAGE_LABELS[stage]}.`);
    }

    setSaving(null);
  };

  const approveWithoutInvite = async () => {
    if (!lumimar || !selectedLead) {
      return;
    }

    setApproving(true);
    setError(null);
    setNotice(null);

    const ownerRecord = {
      display_name: selectedLead.name,
      legal_name: selectedLead.name,
      email: selectedLead.email.toLowerCase(),
      phone: selectedLead.phone || null,
      primary_residence: selectedLead.location || null,
      notes: `Approved from lead ${selectedLead.id}. Portal invite not sent yet.`,
    };

    const { data: existingOwners, error: findOwnerError } = await lumimar
      .from('owners')
      .select('id')
      .eq('email', ownerRecord.email)
      .limit(1);

    if (findOwnerError) {
      setError(findOwnerError.message);
      setApproving(false);
      return;
    }

    const existingOwnerId = existingOwners?.[0]?.id;
    const { error: ownerError } = existingOwnerId
      ? await lumimar.from('owners').update(ownerRecord).eq('id', existingOwnerId)
      : await lumimar.from('owners').insert(ownerRecord);

    if (ownerError) {
      setError(ownerError.message);
      setApproving(false);
      return;
    }

    const { error: updateError } = await lumimar.from('lead_inquiries').update({ stage: 'won' }).eq('id', selectedLead.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setLeads((current) => current.map((item) => (item.id === selectedLead.id ? { ...item, stage: 'won' } : item)));
      setNotice(`${selectedLead.name} approved as an owner. Portal invite was not sent.`);
    }

    setApproving(false);
  };

  const inviteOwner = async () => {
    if (!supabase || !selectedLead) {
      return;
    }

    setInviting(true);
    setError(null);
    setNotice(null);

    const { error: inviteError } = await supabase.functions.invoke('invite-owner', {
      body: {
        email: selectedLead.email,
        fullName: selectedLead.name,
        phone: selectedLead.phone,
        displayName: selectedLead.name,
        legalName: selectedLead.name,
        primaryResidence: selectedLead.location,
      },
    });

    if (inviteError) {
      const message =
        inviteError instanceof FunctionsHttpError ? await readFunctionError(inviteError) : stringifyFunctionDetail(inviteError);
      setError(message || 'Invite request failed. Check your Supabase Edge Function logs for details.');
      setInviting(false);
      return;
    }

    await updateLeadStage(selectedLead, 'won');
    setNotice(`Owner invite sent to ${selectedLead.email}.`);
    setInviting(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Applicant Verification</p>
          <h2 className="mt-1 text-3xl font-headline font-bold text-primary">Lead Management</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Review new property owner applicants, move them through the pipeline, and invite approved owners.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadLeads()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Applicants</p>
          <h3 className="mt-2 text-3xl font-bold text-primary">{leads.length}</h3>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">New</p>
          <h3 className="mt-2 text-3xl font-bold text-primary">{totals.new ?? 0}</h3>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-ambient">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">In Review</p>
          <h3 className="mt-2 text-3xl font-bold text-primary">
            {(totals.discovery ?? 0) + (totals.site_visit ?? 0) + (totals.proposal ?? 0) + (totals.closing ?? 0)}
          </h3>
        </div>
        <div className="rounded-xl bg-primary p-5 text-white shadow-ambient">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">Approved Owners</p>
          <h3 className="mt-2 text-3xl font-bold">{totals.won ?? 0}</h3>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {notice ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
        <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
          <div className="flex flex-col gap-3 border-b border-outline-variant/20 bg-surface-container/30 p-5 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="font-bold text-primary">Applicants</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone..."
                className="rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-primary focus:outline-none focus:border-primary"
              />
              <select
                value={stageFilter}
                onChange={(event) => setStageFilter(event.target.value as 'all' | LeadStage)}
                className="rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-primary focus:outline-none focus:border-primary"
              >
                <option value="all">All stages</option>
                {STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {STAGE_LABELS[stage]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                  <th className="p-5">Applicant</th>
                  <th className="p-5">Location</th>
                  <th className="p-5">Interest</th>
                  <th className="p-5">Stage</th>
                  <th className="p-5">Submitted</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">
                      Loading applicants...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">
                      No applicants match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-container text-sm font-bold text-primary">
                            {getInitials(lead.name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">{lead.name}</p>
                            <p className="text-xs text-on-surface-variant">{lead.email}</p>
                            <p className="text-xs text-on-surface-variant">{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-primary">{lead.location}</td>
                      <td className="p-5 text-sm text-primary">{SERVICE_LABELS[lead.service] ?? lead.service}</td>
                      <td className="p-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${STAGE_CLASSES[lead.stage]}`}
                        >
                          {STAGE_LABELS[lead.stage]}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-on-surface-variant">{formatDate(lead.created_at)}</td>
                      <td className="p-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          {selectedLead ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Selected Applicant</p>
                <h3 className="mt-2 text-2xl font-headline font-bold text-primary">{selectedLead.name}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">{selectedLead.location}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <a href={`mailto:${selectedLead.email}`} className="rounded-lg bg-surface-container-low px-4 py-3 text-primary hover:underline">
                  {selectedLead.email}
                </a>
                <a href={`tel:${selectedLead.phone}`} className="rounded-lg bg-surface-container-low px-4 py-3 text-primary hover:underline">
                  {selectedLead.phone}
                </a>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Current Earnings</p>
                  <p className="mt-1 text-primary">
                    {selectedLead.current_earnings_band
                      ? EARNINGS_LABELS[selectedLead.current_earnings_band] ?? selectedLead.current_earnings_band
                      : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Interested In</p>
                  <p className="mt-1 text-primary">{SERVICE_LABELS[selectedLead.service] ?? selectedLead.service}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Message</p>
                  <p className="mt-1 rounded-lg bg-surface-container-low p-4 text-primary leading-relaxed">
                    {selectedLead.message || 'No additional notes provided.'}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Verification Stage
                </label>
                <select
                  value={selectedLead.stage}
                  disabled={approving || inviting || saving === selectedLead.id}
                  onChange={(event) => void updateLeadStage(selectedLead, event.target.value as LeadStage)}
                  className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary disabled:opacity-60"
                >
                  {STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {STAGE_LABELS[stage]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => void updateLeadStage(selectedLead, 'discovery')}
                  disabled={approving || inviting || saving === selectedLead.id || selectedLead.stage === 'discovery'}
                  className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Mark Verified For Discovery
                </button>
                <button
                  type="button"
                  onClick={() => void updateLeadStage(selectedLead, 'lost')}
                  disabled={approving || inviting || saving === selectedLead.id || selectedLead.stage === 'lost'}
                  className="rounded-lg border border-rose-200 px-4 py-3 text-sm font-bold text-rose-700 hover:bg-rose-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reject Applicant
                </button>
                <button
                  type="button"
                  onClick={() => void approveWithoutInvite()}
                  disabled={approving || inviting || saving === selectedLead.id || selectedLead.stage === 'lost'}
                  className="rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-ambient hover:bg-primary-container transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {approving ? 'Approving...' : 'Approve Without Invite'}
                </button>
                <button
                  type="button"
                  onClick={() => void inviteOwner()}
                  disabled={approving || inviting || saving === selectedLead.id || selectedLead.stage === 'lost'}
                  className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {inviting ? 'Sending Invite...' : 'Send Portal Invite'}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">person_search</span>
              <p className="mt-3 text-sm text-on-surface-variant">Select an applicant to review.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
