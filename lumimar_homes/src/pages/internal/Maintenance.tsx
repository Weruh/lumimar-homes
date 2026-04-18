import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function InternalMaintenance() {
  return (
    <PortalEmptyState
      eyebrow="Internal Workspace"
      icon="handyman"
      title="Maintenance tickets will appear here once live issues are being tracked."
      description="Mock ticket IDs, properties, priorities, and approval states have been removed. Connect this page to the production maintenance workflow before using it with staff or owners."
    />
  );
}
