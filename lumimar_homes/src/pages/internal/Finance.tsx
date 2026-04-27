import { useEffect, useMemo, useState } from 'react';
import { lumimar } from '../../lib/supabase';

type PayoutStatus = 'draft' | 'pending' | 'approved' | 'paid' | 'failed';

type Owner = {
  display_name: string;
  email: string | null;
};

type Payout = {
  id: string;
  owner_id: string;
  period_start: string;
  period_end: string;
  gross_revenue: number;
  deductions: number;
  net_payout: number;
  status: PayoutStatus;
  payout_method_snapshot: string | null;
  payout_reference: string | null;
  paid_at: string | null;
  owners?: Owner | null;
};

const STATUS_CLASSES: Record<PayoutStatus, string> = {
  draft: 'bg-surface-container text-on-surface-variant',
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-blue-50 text-blue-700',
  paid: 'bg-emerald-50 text-emerald-700',
  failed: 'bg-rose-50 text-rose-700',
};

const currency = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number | null | undefined) {
  return currency.format(Number(value ?? 0));
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium' }).format(new Date(value));
}

function downloadCsv(rows: Payout[]) {
  const headers = ['Owner', 'Period Start', 'Period End', 'Gross Revenue', 'Deductions', 'Net Payout', 'Status'];
  const lines = rows.map((row) =>
    [
      row.owners?.display_name ?? row.owner_id,
      row.period_start,
      row.period_end,
      row.gross_revenue,
      row.deductions,
      row.net_payout,
      row.status,
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(','),
  );
  const blob = new Blob([[headers.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lumimar-payouts-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function InternalFinance() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadPayouts = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: payoutError } = await (lumimar as any)
      .from('payouts')
      .select('*, owners(display_name, email)')
      .order('period_end', { ascending: false });

    if (payoutError) {
      setError(payoutError.message);
      setPayouts([]);
    } else {
      setPayouts((data ?? []) as Payout[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadPayouts();
  }, []);

  const totals = useMemo(() => {
    const active = payouts.filter((payout) => payout.status !== 'failed');
    return {
      gross: active.reduce((sum, payout) => sum + Number(payout.gross_revenue ?? 0), 0),
      deductions: active.reduce((sum, payout) => sum + Number(payout.deductions ?? 0), 0),
      pending: payouts
        .filter((payout) => payout.status === 'pending' || payout.status === 'approved')
        .reduce((sum, payout) => sum + Number(payout.net_payout ?? 0), 0),
      paid: payouts.filter((payout) => payout.status === 'paid').reduce((sum, payout) => sum + Number(payout.net_payout ?? 0), 0),
    };
  }, [payouts]);

  const updatePayout = async (id: string, status: PayoutStatus) => {
    if (!lumimar) {
      return;
    }

    setSaving(id);
    setError(null);
    setNotice(null);

    const updates = {
      status,
      paid_at: status === 'paid' ? new Date().toISOString() : null,
    };
    const { error: updateError } = await (lumimar as any).from('payouts').update(updates).eq('id', id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setPayouts((current) =>
        current.map((payout) => (payout.id === id ? { ...payout, ...updates } : payout)),
      );
      setNotice(`Payout marked ${status}.`);
    }

    setSaving(null);
  };

  const processAll = async () => {
    const payable = payouts.filter((payout) => payout.status === 'pending' || payout.status === 'approved');

    for (const payout of payable) {
      await updatePayout(payout.id, 'paid');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Financial Operations</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Manage owner payouts, deductions, and revenue reports.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => void loadPayouts()}
            className="rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => downloadCsv(payouts)}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {notice ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Gross Revenue</p>
          <h3 className="text-3xl font-bold text-primary">{formatCurrency(totals.gross)}</h3>
          <p className="mt-2 text-xs font-bold text-on-surface-variant">Across all active payout periods</p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Lumimar Deductions</p>
          <h3 className="text-3xl font-bold text-primary">{formatCurrency(totals.deductions)}</h3>
          <p className="mt-2 text-xs font-bold text-on-surface-variant">Fees and maintenance deductions</p>
        </div>
        <div className="rounded-xl border-l-4 border-tertiary-fixed-dim bg-surface-container-lowest p-6 shadow-ambient">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Pending Payouts</p>
          <h3 className="text-3xl font-bold text-primary">{formatCurrency(totals.pending)}</h3>
          <p className="mt-2 text-xs font-bold text-on-surface-variant">{formatCurrency(totals.paid)} already paid</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-container/30 p-6">
          <h3 className="font-bold text-primary">Owner Payouts</h3>
          <button type="button" onClick={() => void processAll()} className="text-sm font-bold text-primary hover:underline">
            Process All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                <th className="p-6">Owner</th>
                <th className="p-6">Period</th>
                <th className="p-6">Gross Revenue</th>
                <th className="p-6">Deductions</th>
                <th className="p-6">Net Payout</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm text-on-surface-variant">
                    Loading payouts...
                  </td>
                </tr>
              ) : payouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm text-on-surface-variant">
                    No payout records yet.
                  </td>
                </tr>
              ) : (
                payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-6">
                      <p className="text-sm font-bold text-primary">{payout.owners?.display_name ?? 'Unknown owner'}</p>
                      <p className="text-xs text-on-surface-variant">{payout.owners?.email ?? payout.payout_reference ?? 'No contact'}</p>
                    </td>
                    <td className="p-6 text-sm text-on-surface-variant">
                      {formatDate(payout.period_start)} - {formatDate(payout.period_end)}
                    </td>
                    <td className="p-6 text-sm">{formatCurrency(payout.gross_revenue)}</td>
                    <td className="p-6 text-sm text-rose-600">-{formatCurrency(payout.deductions)}</td>
                    <td className="p-6 text-sm font-bold text-primary">{formatCurrency(payout.net_payout)}</td>
                    <td className="p-6">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLASSES[payout.status]}`}>
                        {payout.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <select
                        value={payout.status}
                        disabled={saving === payout.id}
                        onChange={(event) => void updatePayout(payout.id, event.target.value as PayoutStatus)}
                        className="rounded-lg border border-outline-variant/30 bg-white px-3 py-2 text-xs font-bold text-primary focus:outline-none focus:border-primary disabled:opacity-60"
                      >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
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
