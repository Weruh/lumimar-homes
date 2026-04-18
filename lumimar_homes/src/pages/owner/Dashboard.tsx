import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function OwnerDashboard() {
  return (
    <PortalEmptyState
      eyebrow="Owner Portal"
      icon="dashboard"
      title="Portfolio reporting will appear here once live data is available."
      description="This dashboard has been cleared of mock occupancy, revenue, guest, and maintenance data. Connect the owner views to your production bookings, payouts, and property records before exposing reporting to users."
    />
  );
}
