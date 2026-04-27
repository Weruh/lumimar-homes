import { useEffect, useMemo, useState } from 'react';
import { lumimar } from '../../lib/supabase';

type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

type Property = {
  id: string;
  name: string;
  location_label: string;
};

type CleaningJob = {
  id: string;
  property_id: string;
  scheduled_start: string;
  scheduled_end: string;
  assigned_team: string | null;
  status: JobStatus;
  notes: string | null;
  properties?: Property | null;
};

const STATUS_CLASSES: Record<JobStatus, string> = {
  scheduled: 'bg-surface-container text-on-surface-variant',
  in_progress: 'bg-amber-50 text-amber-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-rose-50 text-rose-700',
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function toLocalInputValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function InternalCleaning() {
  const [jobs, setJobs] = useState<CleaningJob[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState({
    property_id: '',
    scheduled_start: toLocalInputValue(new Date()),
    scheduled_end: toLocalInputValue(new Date(Date.now() + 3 * 60 * 60 * 1000)),
    assigned_team: '',
    notes: '',
  });

  const loadData = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const [jobsResult, propertiesResult] = await Promise.all([
      (lumimar as any)
        .from('cleaning_jobs')
        .select('*, properties(id, name, location_label)')
        .order('scheduled_start', { ascending: true }),
      (lumimar as any).from('properties').select('id, name, location_label').order('name'),
    ]);

    if (jobsResult.error) {
      setError(jobsResult.error.message);
      setJobs([]);
    } else {
      setJobs((jobsResult.data ?? []) as CleaningJob[]);
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

  const totals = useMemo(
    () => ({
      scheduled: jobs.filter((job) => job.status === 'scheduled').length,
      active: jobs.filter((job) => job.status === 'in_progress').length,
      completed: jobs.filter((job) => job.status === 'completed').length,
      teams: new Set(jobs.map((job) => job.assigned_team).filter(Boolean)).size,
    }),
    [jobs],
  );

  const updateStatus = async (job: CleaningJob, status: JobStatus) => {
    if (!lumimar || job.status === status) {
      return;
    }

    setSaving(job.id);
    setError(null);
    setNotice(null);

    const { error: updateError } = await (lumimar as any).from('cleaning_jobs').update({ status }).eq('id', job.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setJobs((current) => current.map((item) => (item.id === job.id ? { ...item, status } : item)));
      setNotice(`Cleaning job marked ${status.replace('_', ' ')}.`);
    }

    setSaving(null);
  };

  const createJob = async () => {
    if (!lumimar) {
      return;
    }

    setSaving('new');
    setError(null);
    setNotice(null);

    const { error: insertError } = await (lumimar as any).from('cleaning_jobs').insert({
      property_id: form.property_id,
      scheduled_start: new Date(form.scheduled_start).toISOString(),
      scheduled_end: new Date(form.scheduled_end).toISOString(),
      assigned_team: form.assigned_team || null,
      notes: form.notes || null,
      status: 'scheduled',
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      setNotice('Cleaning dispatch created.');
      setShowForm(false);
      await loadData();
    }

    setSaving(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Cleaning Operations</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Manage turnover schedules and cleaning teams.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void loadData()} className="rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary">
            Refresh
          </button>
          <button type="button" onClick={() => setShowForm((value) => !value)} className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-md">
            Dispatch Team
          </button>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {notice ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

      {showForm ? (
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <select value={form.property_id} onChange={(event) => setForm({ ...form, property_id: event.target.value })} className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm md:col-span-2">
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
            <input type="datetime-local" value={form.scheduled_start} onChange={(event) => setForm({ ...form, scheduled_start: event.target.value })} className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
            <input type="datetime-local" value={form.scheduled_end} onChange={(event) => setForm({ ...form, scheduled_end: event.target.value })} className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
            <input type="text" value={form.assigned_team} onChange={(event) => setForm({ ...form, assigned_team: event.target.value })} placeholder="Team name" className="rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
          </div>
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Dispatch notes" className="mt-4 w-full rounded-lg border border-outline-variant/30 px-4 py-3 text-sm" />
          <button type="button" onClick={() => void createJob()} disabled={saving === 'new' || !form.property_id} className="mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
            Create Dispatch
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border-l-4 border-amber-500 bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Scheduled</p>
          <h3 className="text-3xl font-bold text-primary">{totals.scheduled}</h3>
        </div>
        <div className="rounded-xl border-l-4 border-emerald-500 bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Completed</p>
          <h3 className="text-3xl font-bold text-primary">{totals.completed}</h3>
        </div>
        <div className="rounded-xl border-l-4 border-blue-500 bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Active Teams</p>
          <h3 className="text-3xl font-bold text-primary">{totals.teams}</h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="border-b border-outline-variant/20 bg-surface-container/30 p-6">
          <h3 className="font-bold text-primary">Cleaning Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                <th className="p-6">Time Window</th>
                <th className="p-6">Property</th>
                <th className="p-6">Assigned Team</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-sm text-on-surface-variant">Loading cleaning jobs...</td></tr>
              ) : jobs.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-sm text-on-surface-variant">No cleaning jobs yet.</td></tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-6 text-sm font-medium">{formatTime(job.scheduled_start)} - {formatTime(job.scheduled_end)}</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-primary">{job.properties?.name ?? 'Unknown property'}</p>
                      <p className="text-xs text-on-surface-variant">{job.properties?.location_label ?? job.notes ?? 'No location'}</p>
                    </td>
                    <td className="p-6 text-sm">{job.assigned_team ?? 'Unassigned'}</td>
                    <td className="p-6">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLASSES[job.status]}`}>{job.status.replace('_', ' ')}</span>
                    </td>
                    <td className="p-6 text-right">
                      <select value={job.status} disabled={saving === job.id} onChange={(event) => void updateStatus(job, event.target.value as JobStatus)} className="rounded-lg border border-outline-variant/30 bg-white px-3 py-2 text-xs font-bold text-primary disabled:opacity-60">
                        <option value="scheduled">Scheduled</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
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
