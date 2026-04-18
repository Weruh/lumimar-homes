export default function InternalDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border-b-2 border-transparent hover:border-tertiary-fixed-dim transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/5 rounded-lg text-primary">
              <span className="material-symbols-outlined">group_add</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-tighter">New Leads</p>
          <h2 className="text-3xl font-bold text-primary mt-1 font-headline">24</h2>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient transition-all duration-300 border-b-2 border-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/5 rounded-lg text-primary">
              <span className="material-symbols-outlined">holiday_village</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant/50">14 Active</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-tighter">Properties</p>
          <h2 className="text-3xl font-bold text-primary mt-1 font-headline">158</h2>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient transition-all duration-300 border-b-2 border-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/5 rounded-lg text-primary">
              <span className="material-symbols-outlined">mop</span>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">High Load</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-tighter">Pending Cleans</p>
          <h2 className="text-3xl font-bold text-primary mt-1 font-headline">18</h2>
        </div>
        <div className="bg-primary p-6 rounded-3xl shadow-ambient text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined">build</span>
            </div>
            <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">3 Urgent</span>
          </div>
          <p className="text-sm font-medium opacity-70 uppercase tracking-tighter">Maint. Tickets</p>
          <h2 className="text-3xl font-bold mt-1 font-headline">42</h2>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-secondary-container rounded-3xl p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-primary font-headline text-2xl mb-1">Revenue Snapshot</h3>
            <p className="text-sm text-on-secondary-container mb-8">October Performance</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs uppercase tracking-widest text-on-secondary-container/70 font-semibold">Total Revenue</span>
                  <span className="text-xl font-bold text-primary">$142,500</span>
                </div>
                <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/40 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-on-secondary-container/60 mb-1">Bookings</p>
                  <p className="text-lg font-bold text-primary">$89k</p>
                </div>
                <div className="bg-white/40 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-on-secondary-container/60 mb-1">Services</p>
                  <p className="text-lg font-bold text-primary">$53k</p>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm tracking-wide shadow-lg hover:translate-y-[-2px] transition-all">
                View Detailed Report
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-tertiary-fixed-dim/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        </div>

        <div className="lg:col-span-2 bg-surface-container-low rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-primary font-headline text-2xl">Leads Pipeline</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="w-2 h-2 rounded-full bg-outline-variant/30"></span>
              <span className="w-2 h-2 rounded-full bg-outline-variant/30"></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">Discovery</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-primary shadow-sm">
                <p className="text-xs font-bold text-primary">Villa Watamu</p>
                <p className="text-[10px] text-on-surface-variant">Owner: Alisdair K.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-primary/40 shadow-sm opacity-60">
                <p className="text-xs font-bold text-primary">Shoreline Apt</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">Site Visit</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-tertiary-fixed-dim shadow-sm">
                <p className="text-xs font-bold text-primary">Blue Horizon</p>
                <p className="text-[10px] text-on-surface-variant">Scheduled: 2pm</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container"></span>
                <span className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">Proposal</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-on-primary-container shadow-sm">
                <p className="text-xs font-bold text-primary">Coral Reef Estate</p>
                <p className="text-[10px] text-on-surface-variant">Sent 2d ago</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-on-primary-container shadow-sm">
                <p className="text-xs font-bold text-primary">Diani Sanctuary</p>
                <p className="text-[10px] text-on-surface-variant">Reviewing</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">Onboarding</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
                <p className="text-xs font-bold text-primary">Ocean Peak</p>
                <p className="text-[10px] text-on-surface-variant">Final Signoff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-ambient">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-primary font-headline text-2xl">Daily Operations</h3>
            <p className="text-sm text-on-surface-variant">Turnover Schedule & Priority Tasks</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-surface-container rounded-lg text-xs font-bold text-primary border border-outline-variant/10">All Tasks</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md">Add Dispatch</button>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">Property</th>
                <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">Type</th>
                <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">Team</th>
                <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">Window</th>
                <th className="pb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="/images/s3/1.jpg" alt="property" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-primary">Palm Suite 402</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">cleaning_services</span>
                    <span className="text-xs">Turnover Clean</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex -space-x-2">
                    <img src="/images/s1/3.jpg" alt="worker" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                    <img src="/images/s1/4.jpg" alt="worker" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  </div>
                </td>
                <td className="py-4 text-xs text-on-surface-variant">11:00 — 15:00</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">In Progress</span>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="/images/s5/1.jpg" alt="property" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-primary">Villa Azure Shore</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">handyman</span>
                    <span className="text-xs">AC Maintenance</span>
                  </div>
                </td>
                <td className="py-4 text-xs font-medium">Technician Mike</td>
                <td className="py-4 text-xs text-on-surface-variant">09:00 — 12:00</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="/images/s8/1.jpg" alt="property" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-primary">The Sands 12B</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">cleaning_services</span>
                    <span className="text-xs">Deep Clean</span>
                  </div>
                </td>
                <td className="py-4 text-xs font-medium">Team Beta</td>
                <td className="py-4 text-xs text-on-surface-variant">14:00 — 18:00</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wide">Scheduled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
