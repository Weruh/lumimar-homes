import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function InternalLeads() {
  return (
    <PortalEmptyState
      eyebrow="Internal Workspace"
      icon="leaderboard"
      title="Lead management is ready for live data, not sample leads."
      description="Sample owners, property names, valuations, and timestamps have been removed. Connect this screen to the lead pipeline tables and views in Supabase before using it operationally."
    />
  );
}
