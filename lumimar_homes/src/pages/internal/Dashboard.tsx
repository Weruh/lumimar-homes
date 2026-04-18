import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function InternalDashboard() {
  return (
    <PortalEmptyState
      eyebrow="Internal Workspace"
      icon="analytics"
      title="Live operations reporting has not been connected yet."
      description="All mock lead counts, revenue totals, pipeline cards, and operations tables have been removed. Wire this workspace to production dashboards and operational data before staff use it."
    />
  );
}
