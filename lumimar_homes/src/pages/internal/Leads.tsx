export default function InternalLeads() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Lead Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">Track and convert property owner inquiries.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-colors">
          + New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Active</p>
          <h3 className="text-3xl font-bold text-primary">42</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Discovery</p>
          <h3 className="text-3xl font-bold text-primary">18</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Proposals Sent</p>
          <h3 className="text-3xl font-bold text-primary">15</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Closing</p>
          <h3 className="text-3xl font-bold text-primary">9</h3>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30">
          <h3 className="font-bold text-primary">Active Pipeline</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="Search leads..." className="px-4 py-2 rounded-lg border border-outline-variant/30 text-sm focus:outline-none focus:border-primary" />
            <button className="p-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 border-b border-outline-variant/10">
                <th className="p-6">Property / Owner</th>
                <th className="p-6">Location</th>
                <th className="p-6">Est. Value</th>
                <th className="p-6">Stage</th>
                <th className="p-6">Last Contact</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Villa Watamu</p>
                  <p className="text-xs text-on-surface-variant">Alisdair K.</p>
                </td>
                <td className="p-6 text-sm">Watamu, KE</td>
                <td className="p-6 text-sm font-medium">$4,500/mo</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Discovery</span>
                </td>
                <td className="p-6 text-sm text-on-surface-variant">2 hours ago</td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Blue Horizon</p>
                  <p className="text-xs text-on-surface-variant">Sarah M.</p>
                </td>
                <td className="p-6 text-sm">Diani Beach, KE</td>
                <td className="p-6 text-sm font-medium">$3,200/mo</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Site Visit</span>
                </td>
                <td className="p-6 text-sm text-on-surface-variant">Yesterday</td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Coral Reef Estate</p>
                  <p className="text-xs text-on-surface-variant">James T.</p>
                </td>
                <td className="p-6 text-sm">Kilifi, KE</td>
                <td className="p-6 text-sm font-medium">$6,000/mo</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Proposal</span>
                </td>
                <td className="p-6 text-sm text-on-surface-variant">3 days ago</td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Ocean Peak</p>
                  <p className="text-xs text-on-surface-variant">Elena R.</p>
                </td>
                <td className="p-6 text-sm">Nyali, KE</td>
                <td className="p-6 text-sm font-medium">$2,800/mo</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Onboarding</span>
                </td>
                <td className="p-6 text-sm text-on-surface-variant">Today</td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
