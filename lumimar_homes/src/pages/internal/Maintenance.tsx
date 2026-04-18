export default function InternalMaintenance() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Maintenance</h2>
          <p className="text-sm text-on-surface-variant mt-1">Track repairs, approvals, and vendor dispatches.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-colors">
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Open Tickets</p>
          <h3 className="text-3xl font-bold text-primary">24</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-red-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Urgent</p>
          <h3 className="text-3xl font-bold text-red-600">3</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-amber-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Awaiting Approval</p>
          <h3 className="text-3xl font-bold text-amber-600">7</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border-l-4 border-emerald-500">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Resolved (7d)</p>
          <h3 className="text-3xl font-bold text-emerald-600">18</h3>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30">
          <h3 className="font-bold text-primary">Ticket Queue</h3>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-lg border border-outline-variant/30 text-sm focus:outline-none focus:border-primary bg-white">
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Awaiting Approval</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 border-b border-outline-variant/10">
                <th className="p-6">Ticket ID</th>
                <th className="p-6">Property</th>
                <th className="p-6">Issue</th>
                <th className="p-6">Priority</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-mono text-on-surface-variant">TKT-8921</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Lamu Heritage House</p>
                </td>
                <td className="p-6 text-sm">AC Unit Not Cooling</td>
                <td className="p-6">
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-[10px] font-bold uppercase tracking-wide">High</span>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">In Progress</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Manage</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-mono text-on-surface-variant">TKT-8920</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Watamu Shores Villa</p>
                </td>
                <td className="p-6 text-sm">Pool Pump Replacement</td>
                <td className="p-6">
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-[10px] font-bold uppercase tracking-wide">Medium</span>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Awaiting Owner</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Manage</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-6 text-sm font-mono text-on-surface-variant">TKT-8915</td>
                <td className="p-6">
                  <p className="font-bold text-primary text-sm">Diani Azure Loft</p>
                </td>
                <td className="p-6 text-sm">Leaking Faucet (Kitchen)</td>
                <td className="p-6">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wide">Low</span>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wide">Open</span>
                </td>
                <td className="p-6 text-right">
                  <button className="text-primary font-bold text-xs hover:underline">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
