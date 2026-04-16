export default function OwnerProperties() {
  return (
    <>
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-on-tertiary-container font-label text-[10px] uppercase tracking-[0.15em] font-bold">Portfolio Overview</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight font-headline">My Properties</h2>
          <p className="text-on-surface-variant max-w-md text-lg font-light leading-relaxed">Manage your coastal sanctuary investments and monitor real-time performance across the Kenya Coast.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-lowest text-primary border border-outline-variant/15 px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 shadow-sm hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 shadow-ambient hover:scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Add Property
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden group shadow-ambient">
          <div className="relative h-[400px] overflow-hidden">
            <img src="/images/s9/1.jpg" alt="Shanzu property" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Live</span>
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Top 1% Performance</span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-on-tertiary-container font-label text-[10px] uppercase tracking-widest font-bold">Short-Term Stay</span>
                <h3 className="text-3xl font-bold text-primary mt-1 font-headline">Watamu Shores Villa</h3>
                <div className="flex items-center gap-4 mt-3 text-on-surface-variant text-sm">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Watamu, KE</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">star</span> 4.98 Rating</span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none border border-outline-variant/30 px-6 py-3 rounded-md text-sm font-semibold hover:bg-surface-container-low transition-colors">Statements</button>
                <button className="flex-1 md:flex-none bg-primary text-on-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary-container transition-colors">View Details</button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="bg-secondary-container p-8 rounded-xl flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-secondary-container">Portfolio Value</h4>
              <p className="text-4xl font-black text-primary mt-4 tracking-tighter">$1.4M</p>
            </div>
            <div className="mt-8 pt-8 border-t border-on-secondary-container/10">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-on-secondary-container/70">Occupancy Rate</span>
                <span className="text-primary font-bold">88%</span>
              </div>
              <div className="w-full bg-white/30 h-1.5 rounded-full mt-2">
                <div className="bg-primary w-[88%] h-full rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex-1 flex items-center justify-between group cursor-pointer hover:bg-surface-container-high transition-colors">
            <div>
              <h4 className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">Active Bookings</h4>
              <p className="text-4xl font-black text-primary mt-2">24</p>
            </div>
            <span className="material-symbols-outlined text-primary-container/20 text-5xl group-hover:text-primary transition-colors">calendar_month</span>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient group">
          <div className="h-64 relative overflow-hidden">
            <img src="/images/s4/1.jpg" alt="Shanzu penthouse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Live</span>
              <span className="bg-primary-container text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Rank #4</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-on-tertiary-container font-label text-[10px] uppercase tracking-widest font-bold">Short-Term Stay</span>
            <h3 className="text-xl font-bold text-primary mt-1 font-headline">Diani Azure Loft</h3>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 border border-outline-variant/30 py-2.5 rounded-md text-xs font-bold hover:bg-surface-container-low">Statements</button>
              <button className="flex-1 bg-primary-container text-white py-2.5 rounded-md text-xs font-bold hover:bg-primary">View Details</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient group">
          <div className="h-64 relative overflow-hidden">
            <img src="/images/s7/1.jpg" alt="Shanzu villa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Live</span>
              <span className="bg-primary-container text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Rank #12</span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-on-tertiary-container font-label text-[10px] uppercase tracking-widest font-bold">Short-Term Stay</span>
            <h3 className="text-xl font-bold text-primary mt-1 font-headline">Lamu Heritage House</h3>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 border border-outline-variant/30 py-2.5 rounded-md text-xs font-bold hover:bg-surface-container-low">Statements</button>
              <button className="flex-1 bg-primary-container text-white py-2.5 rounded-md text-xs font-bold hover:bg-primary">View Details</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient group border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">add_home</span>
          </div>
          <h3 className="font-bold text-primary font-headline">Expand Portfolio</h3>
          <p className="text-sm text-on-surface-variant mt-2">Add a new property to the Lumimar network and start earning.</p>
          <button className="mt-6 text-primary font-bold text-sm underline underline-offset-4">Learn more</button>
        </div>
      </div>
    </>
  );
}
