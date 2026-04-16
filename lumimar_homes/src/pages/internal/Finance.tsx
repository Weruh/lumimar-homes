export default function InternalFinance() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Financial Operations</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage payouts, platform fees, and revenue reports.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Gross Revenue (MTD)</p>
          <h3 className="text-3xl font-bold text-primary">$142,500</h3>
          <p className="text-xs text-emerald-600 mt-2 font-bold">+8.4% vs last month</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Lumimar Fees (MTD)</p>
          <h3 className="text-3xl font-bold text-primary">$28,500</h3>
          <p className="text-xs text-emerald-600 mt-2 font-bold">+8.4% vs last month</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-tertiary-fixed-dim">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Pending Payouts</p>
          <h3 className="text-3xl font-bold text-primary">$114,000</h3>
          <p className="text-xs text-on-surface-variant mt-2 font-bold">Scheduled for Nov 1</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30">
          <h3 className="font-bold text-primary">Owner Payouts (Upcoming)</h3>
          <button className="text-primary font-bold text-sm hover:underline">Process All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 border-b border-outline-variant/10">
                <th className="p-6">Owner</th>
                <th className="p-6">Properties</th>
                <th className="p-6">Gross Revenue</th>
                <th className="p-6">Deductions (Fees/Maint)</th>
                <th className="p-6">Net Payout</th>
                <th className="p-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 font-bold text-primary text-sm">Alisdair K.</td>
                <td className="p-6 text-sm text-on-surface-variant">2</td>
                <td className="p-6 text-sm">$18,400.00</td>
                <td className="p-6 text-sm text-red-600">-$4,200.00</td>
                <td className="p-6 text-sm font-bold text-primary">$14,200.00</td>
                <td className="p-6 text-right">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 font-bold text-primary text-sm">Sarah M.</td>
                <td className="p-6 text-sm text-on-surface-variant">1</td>
                <td className="p-6 text-sm">$8,200.00</td>
                <td className="p-6 text-sm text-red-600">-$1,640.00</td>
                <td className="p-6 text-sm font-bold text-primary">$6,560.00</td>
                <td className="p-6 text-right">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 font-bold text-primary text-sm">James T.</td>
                <td className="p-6 text-sm text-on-surface-variant">4</td>
                <td className="p-6 text-sm">$42,850.00</td>
                <td className="p-6 text-sm text-red-600">-$8,570.00</td>
                <td className="p-6 text-sm font-bold text-primary">$34,280.00</td>
                <td className="p-6 text-right">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Approved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
