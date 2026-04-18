import { Link } from 'react-router-dom';

export default function OwnerDashboard() {
  return (
    <>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="uppercase tracking-[0.2em] text-on-surface-variant text-xs font-bold block mb-2">Welcome Back</span>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight font-headline">Portfolio Overview.</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-md font-medium text-sm hover:translate-y-[-2px] transition-all shadow-ambient">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
            <span className="text-xs font-bold text-on-tertiary-container bg-secondary-container px-3 py-1 rounded-full">+4.2% vs last month</span>
          </div>
          <div>
            <div className="text-6xl font-black text-primary mb-1">92%</div>
            <div className="text-on-surface-variant font-medium tracking-wide uppercase text-xs">Portfolio Occupancy</div>
          </div>
        </div>
        <div className="bg-primary text-on-primary p-8 rounded-xl flex flex-col justify-between">
          <span className="material-symbols-outlined text-tertiary-fixed-dim text-3xl">domain</span>
          <div>
            <div className="text-4xl font-bold mb-1">4</div>
            <div className="text-primary-fixed-dim font-medium uppercase text-[10px] tracking-widest">Active Properties</div>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between">
          <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
          <div>
            <div className="text-4xl font-bold text-primary mb-1">12</div>
            <div className="text-on-surface-variant font-medium uppercase text-[10px] tracking-widest">Upcoming Stays</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface-container-lowest rounded-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary font-headline">Gross Revenue</h2>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter">
                <span className="text-primary border-b-2 border-primary pb-1">Yearly</span>
                <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Monthly</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 relative">
              <div className="w-full bg-secondary-container rounded-t-lg h-[40%] hover:bg-tertiary-fixed-dim transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$12.4k</div>
              </div>
              <div className="w-full bg-secondary-container rounded-t-lg h-[65%] hover:bg-tertiary-fixed-dim transition-colors"></div>
              <div className="w-full bg-secondary-container rounded-t-lg h-[55%] hover:bg-tertiary-fixed-dim transition-colors"></div>
              <div className="w-full bg-secondary-container rounded-t-lg h-[85%] hover:bg-tertiary-fixed-dim transition-colors"></div>
              <div className="w-full bg-primary rounded-t-lg h-[95%] relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded">Current: $28.2k</div>
              </div>
              <div className="w-full bg-secondary-container/40 rounded-t-lg h-[40%]"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </section>

          <section className="bg-surface-container-low rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-headline">Recent Stays</h2>
              <button className="text-xs font-bold uppercase text-primary-container hover:underline decoration-2 underline-offset-4">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">SM</div>
                  <div>
                    <h4 className="font-bold text-primary">Sarah Miller</h4>
                    <p className="text-xs text-on-surface-variant">Unit 4 • Lamu Waterfront</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">Oct 12 - Oct 18</div>
                  <div className="text-[10px] font-bold text-on-tertiary-container uppercase">Completed</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">JK</div>
                  <div>
                    <h4 className="font-bold text-primary">James K.</h4>
                    <p className="text-xs text-on-surface-variant">Unit 1 • Watamu Heights</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">Oct 14 - Oct 22</div>
                  <div className="text-[10px] font-bold text-primary uppercase">In-Progress</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">AL</div>
                  <div>
                    <h4 className="font-bold text-primary">Anna Lawson</h4>
                    <p className="text-xs text-on-surface-variant">Unit 2 • Watamu Heights</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">Oct 20 - Oct 25</div>
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase">Upcoming</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-[#001226] text-white p-8 rounded-xl relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-tertiary-fixed-dim/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <span className="uppercase text-[10px] font-bold tracking-widest text-tertiary-fixed-dim">Action Required</span>
            </div>
            <h3 className="text-xl font-bold mb-4 leading-snug font-headline">Maintenance Approval needed for Unit 3 Pool Deck.</h3>
            <p className="text-primary-fixed-dim text-sm mb-8 leading-relaxed">Minor structural reinforcement recommended before peak season. Estimated cost: $1,200.</p>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold py-3 rounded-md text-sm hover:brightness-110 transition-all">Approve Service</button>
              <button className="w-full border border-white/20 text-white font-bold py-3 rounded-md text-sm hover:bg-white/10 transition-all">View Details</button>
            </div>
          </div>

          <div className="bg-secondary-container/50 p-8 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h3 className="text-xl font-bold text-primary font-headline">Lumimar Insights</h3>
            </div>
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <p className="text-primary font-bold text-sm mb-1 group-hover:text-on-primary-container transition-colors">Switch to Monthly Stays for Unit 4</p>
                <p className="text-on-surface-variant text-xs leading-relaxed">Analysis shows a 14% revenue increase potential for long-term corporate bookings this quarter.</p>
                <div className="mt-3 flex items-center text-[10px] font-black uppercase text-primary gap-1">
                  <span>Apply Strategy</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant/30 group cursor-pointer">
                <p className="text-primary font-bold text-sm mb-1 group-hover:text-on-primary-container transition-colors">Upgrade Lighting in Watamu Heights</p>
                <p className="text-on-surface-variant text-xs leading-relaxed">Properties with smart lighting see 22% higher guest satisfaction ratings in our network.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden group relative h-64">
            <img src="/images/s11/1.jpg" alt="Shanzu property" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-bold text-lg">Lamu Waterfront Villa</p>
              <p className="text-primary-fixed-dim text-xs uppercase tracking-widest">Highest Performing Unit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
