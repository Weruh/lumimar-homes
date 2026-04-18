import { useAuth } from '../../context/AuthContext';

export default function OwnerProfile() {
  const { profile, role, user } = useAuth();
  const fullName = profile?.full_name?.trim() || user?.user_metadata?.full_name || 'Not provided';
  const email = user?.email || 'Not provided';
  const phone = profile?.phone?.trim() || 'Not provided';
  const status = profile?.is_active ? 'Active' : 'Pending';
  const memberSince = profile?.created_at
    ? new Intl.DateTimeFormat('en-KE', { year: 'numeric', month: 'long' }).format(new Date(profile.created_at))
    : 'Not available';

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <div className="mb-8 flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-secondary-container shadow-ambient">
          <span className="text-3xl font-bold text-primary">
            {fullName
              .split(' ')
              .filter(Boolean)
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase() || 'LH'}
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{fullName}</h1>
          <p className="text-on-surface-variant">Account created {memberSince}</p>
        </div>
      </div>

      <section className="rounded-2xl bg-surface-container-lowest p-8 shadow-ambient">
        <h2 className="mb-6 border-b border-outline-variant/20 pb-4 font-headline text-xl font-bold text-primary">Personal Information</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
            <p className="font-medium text-primary">{fullName}</p>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
            <p className="font-medium text-primary">{email}</p>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Phone Number</label>
            <p className="font-medium text-primary">{phone}</p>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Application Role</label>
            <p className="font-medium capitalize text-primary">{role ?? 'Not assigned'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-lowest p-8 shadow-ambient">
        <h2 className="mb-6 border-b border-outline-variant/20 pb-4 font-headline text-xl font-bold text-primary">Account Status</h2>
        <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 p-4">
          <div>
            <p className="font-bold text-primary">Portal access</p>
            <p className="text-sm text-on-surface-variant">This page now reads your live authentication profile instead of a fabricated owner profile.</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${profile?.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {status}
          </span>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-lowest p-8 shadow-ambient">
        <h2 className="mb-6 border-b border-outline-variant/20 pb-4 font-headline text-xl font-bold text-primary">Next Production Step</h2>
        <p className="leading-relaxed text-on-surface-variant">
          Payout methods, notification preferences, and profile editing have been intentionally left blank until they are backed by production data and update flows.
        </p>
      </section>
    </div>
  );
}
