export default function OwnerEarnings() {
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase mb-4 block">Total Earnings</span>
            <div className="flex items-baseline gap-4">
              <h2 className="text-5xl font-black text-primary tracking-tight">$42,850.00</h2>
              <span className="text-tertiary-container bg-tertiary-fixed-dim px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +12.4%
              </span>
            </div>
            <p className="text-on-surface-variant mt-2">Combined revenue from 4 coastal properties this month.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/15">
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Last Month</p>
              <p className="text-2xl font-bold text-primary/70">$38,120.00</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Projected Next Month</p>
              <p className="text-2xl font-bold text-primary/70">$45,000.00</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-container text-on-primary rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed-dim/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div>
            <span className="text-xs font-bold tracking-[0.1em] text-primary-fixed-dim uppercase mb-4 block">Next Payout</span>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight font-headline">August 24, 2024</h3>
            <p className="text-primary-fixed-dim text-sm leading-relaxed">Your funds are being prepared for transfer via SWIFT.</p>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-4xl font-black text-white">$12,400</span>
              <span className="text-xs font-bold text-primary-fixed-dim uppercase">8 Days to go</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full">
              <div className="bg-tertiary-fixed-dim h-1 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low rounded-xl p-8">
          <h3 className="text-xl font-bold text-primary mb-8 tracking-tight font-headline">Revenue by Property</h3>
          <div className="space-y-6">
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Mombasa Sands Villa</span>
                <span className="font-bold">$18,200</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%] group-hover:bg-tertiary-fixed-dim transition-colors"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Diani Blue Penthouse</span>
                <span className="font-bold">$12,450</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[60%] group-hover:bg-tertiary-fixed-dim transition-colors"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Watamu Creek House</span>
                <span className="font-bold">$8,900</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[45%] group-hover:bg-tertiary-fixed-dim transition-colors"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Malindi Coral Suite</span>
                <span className="font-bold">$3,300</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[20%] group-hover:bg-tertiary-fixed-dim transition-colors"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-bold text-primary tracking-tight font-headline">Occupancy vs Revenue</h3>
            <button className="material-symbols-outlined text-primary/40 hover:text-primary transition-colors">more_horiz</button>
          </div>
          <div className="flex-grow flex items-end justify-between gap-2 h-48">
            <div className="w-full bg-secondary-container rounded-t-lg h-[40%]"></div>
            <div className="w-full bg-primary h-[60%] rounded-t-lg"></div>
            <div className="w-full bg-secondary-container rounded-t-lg h-[55%]"></div>
            <div className="w-full bg-primary h-[85%] rounded-t-lg"></div>
            <div className="w-full bg-secondary-container rounded-t-lg h-[70%]"></div>
            <div className="w-full bg-primary h-[95%] rounded-t-lg"></div>
            <div className="w-full bg-secondary-container rounded-t-lg h-[50%]"></div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-primary tracking-tight font-headline">Recent Payout History</h3>
          <button className="text-sm font-bold text-primary border-b-2 border-tertiary-fixed-dim hover:border-primary transition-all">View Full Ledger</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">
                <th className="pb-6">Date</th>
                <th className="pb-6">Transaction ID</th>
                <th className="pb-6">Destination</th>
                <th className="pb-6">Amount</th>
                <th className="pb-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-6 font-medium">Aug 15, 2024</td>
                <td className="py-6 text-sm text-on-surface-variant font-mono">TXN-908212</td>
                <td className="py-6 text-sm">Equity Bank ***9021</td>
                <td className="py-6 font-bold text-primary">$11,200.00</td>
                <td className="py-6 text-right">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase">Paid</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-6 font-medium">Aug 01, 2024</td>
                <td className="py-6 text-sm text-on-surface-variant font-mono">TXN-887102</td>
                <td className="py-6 text-sm">Equity Bank ***9021</td>
                <td className="py-6 font-bold text-primary">$9,850.00</td>
                <td className="py-6 text-right">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase">Paid</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-6 font-medium">Jul 15, 2024</td>
                <td className="py-6 text-sm text-on-surface-variant font-mono">TXN-761234</td>
                <td className="py-6 text-sm">Equity Bank ***9021</td>
                <td className="py-6 font-bold text-primary">$12,100.00</td>
                <td className="py-6 text-right">
                  <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase">Processing</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">folder_open</span>
          <h3 className="text-xl font-bold text-primary tracking-tight font-headline">Monthly Financial Statements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <p className="font-bold text-primary">July 2024</p>
              <p className="text-xs text-on-surface-variant">Generated Aug 01</p>
            </div>
            <button className="material-symbols-outlined bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">download</button>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <p className="font-bold text-primary">June 2024</p>
              <p className="text-xs text-on-surface-variant">Generated Jul 01</p>
            </div>
            <button className="material-symbols-outlined bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">download</button>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <p className="font-bold text-primary">May 2024</p>
              <p className="text-xs text-on-surface-variant">Generated Jun 01</p>
            </div>
            <button className="material-symbols-outlined bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">download</button>
          </div>
        </div>
      </section>
    </div>
  );
}
