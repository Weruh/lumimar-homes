export default function InternalCleaning() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Cleaning Operations</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage turnover schedules and cleaning teams.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-colors">
          Dispatch Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-amber-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Pending Today</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-primary">12</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">High Volume</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-emerald-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Completed</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-primary">8</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">On Schedule</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-blue-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Active Teams</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-primary">5</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Fully Deployed</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30">
          <h3 className="font-bold text-primary">Today's Schedule</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/30 text-sm font-bold text-primary shadow-sm">Map View</button>
            <button className="px-4 py-2 bg-surface-container rounded-lg text-sm font-bold text-primary border border-outline-variant/10">List View</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 border-b border-outline-variant/10">
                <th className="p-6">Time Window</th>
                <th className="p-6">Property</th>
                <th className="p-6">Type</th>
                <th className="p-6">Assigned Team</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-medium">09:00 - 12:00</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Diani Azure Loft</p>
                  <p className="text-xs text-on-surface-variant">Unit 4</p>
                </td>
                <td className="p-6 text-sm">Turnover</td>
                <td className="p-6 text-sm">Team Alpha</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Completed</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">View Report</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-medium">11:00 - 14:00</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Palm Suite 402</p>
                  <p className="text-xs text-on-surface-variant">Nyali</p>
                </td>
                <td className="p-6 text-sm">Turnover</td>
                <td className="p-6 text-sm">Team Beta</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">In Progress</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Update</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-medium">14:00 - 17:00</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">The Sands 12B</p>
                  <p className="text-xs text-on-surface-variant">Watamu</p>
                </td>
                <td className="p-6 text-sm">Deep Clean</td>
                <td className="p-6 text-sm">Team Gamma</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wide">Scheduled</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Reassign</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
