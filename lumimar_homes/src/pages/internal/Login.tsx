import AuthLoginPage from '../../components/auth/AuthLoginPage';
import { INTERNAL_ROLES } from '../../lib/auth';

export default function InternalLogin() {
  return (
    <AuthLoginPage
      allowedRoles={INTERNAL_ROLES}
      portalTitle="Lumimar Ops"
      heading="Internal Access"
      description="Lead management, cleaning operations, maintenance, and finance in one place."
      backgroundImage="/images/s9/1.jpg"
      badgeLabel="Staff Portal"
    />
  );
}
