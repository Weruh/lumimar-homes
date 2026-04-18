import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function InternalCleaning() {
  return (
    <PortalEmptyState
      eyebrow="Internal Workspace"
      icon="cleaning_services"
      title="Cleaning operations will appear here once dispatch data is available."
      description="All sample cleaning schedules, teams, properties, and status counts have been removed. Populate this view from your real cleaning job records before launch."
    />
  );
}
