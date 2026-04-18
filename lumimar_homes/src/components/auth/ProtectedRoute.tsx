import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDefaultRouteForRole, isRoleAllowed } from '../../lib/auth';
import type { AppRole } from '../../lib/database.types';

type ProtectedRouteProps = {
  allowedRoles: AppRole[];
  redirectTo: string;
  children: ReactNode;
};

export default function ProtectedRoute({ allowedRoles, redirectTo, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { isConfigured, loading, session, role, error } = useAuth();

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
        <div className="max-w-lg rounded-2xl bg-surface-container-lowest p-8 shadow-ambient">
          <h1 className="text-2xl font-headline text-primary mb-3">Supabase Not Configured</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to the frontend environment before using the protected portal routes.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/15 border-t-primary animate-spin" />
          <p className="mt-4 text-sm text-on-surface-variant">Loading portal access...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
        <div className="max-w-lg rounded-2xl bg-surface-container-lowest p-8 shadow-ambient">
          <h1 className="text-2xl font-headline text-primary mb-3">Account Role Missing</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Your account is authenticated, but no application role is attached to the profile. Contact Lumimar support to finish onboarding.
          </p>
          {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
        </div>
      </div>
    );
  }

  if (!isRoleAllowed(role, allowedRoles)) {
    return <Navigate to={getDefaultRouteForRole(role)} replace />;
  }

  return <>{children}</>;
}
