import AuthLoginPage from '../../components/auth/AuthLoginPage';
import { OWNER_ROLES } from '../../lib/auth';

export default function Login() {
  return (
    <AuthLoginPage
      allowedRoles={OWNER_ROLES}
      portalTitle="Lumimar"
      heading="Owner Access"
      description="View your properties, bookings, and earnings in one place."
      backgroundImage="/images/s6/1.jpg"
      supportLink={{
        prefix: 'New to Lumimar?',
        label: 'Request Access',
        to: '/apply',
      }}
      badgeLabel="Secure Portal"
    />
  );
}
