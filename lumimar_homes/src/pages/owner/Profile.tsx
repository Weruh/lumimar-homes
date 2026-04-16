export default function OwnerProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary-container shadow-ambient">
          <img src="/images/s2/1.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Alisdair K.</h1>
          <p className="text-on-surface-variant">Lumimar Partner since 2022</p>
        </div>
      </div>

      <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient">
        <h2 className="text-xl font-bold text-primary mb-6 font-headline border-b border-outline-variant/20 pb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Full Name</label>
            <p className="text-primary font-medium">Alisdair Kariuki</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email Address</label>
            <p className="text-primary font-medium">alisdair.k@example.com</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Phone Number</label>
            <p className="text-primary font-medium">+254 712 345 678</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Primary Residence</label>
            <p className="text-primary font-medium">Nairobi, Kenya</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-outline-variant/20">
          <button className="text-primary font-bold text-sm hover:underline">Edit Personal Info</button>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient">
        <h2 className="text-xl font-bold text-primary mb-6 font-headline border-b border-outline-variant/20 pb-4">Payout Settings</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-xl">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
              <div>
                <p className="font-bold text-primary">Equity Bank (Kenya)</p>
                <p className="text-sm text-on-surface-variant">Checking •••• 9021</p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active</span>
          </div>
        </div>
        <div className="mt-6">
          <button className="text-primary font-bold text-sm hover:underline">+ Add Payout Method</button>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient">
        <h2 className="text-xl font-bold text-primary mb-6 font-headline border-b border-outline-variant/20 pb-4">Preferences & Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-primary">Monthly Statements</p>
              <p className="text-sm text-on-surface-variant">Receive financial reports via email.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-primary">Maintenance Alerts</p>
              <p className="text-sm text-on-surface-variant">Get notified for repairs over $500.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-primary">New Bookings</p>
              <p className="text-sm text-on-surface-variant">Instant alerts for new reservations.</p>
            </div>
            <div className="w-12 h-6 bg-surface-container-high rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
