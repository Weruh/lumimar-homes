import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function InternalFinance() {
  return (
    <PortalEmptyState
      eyebrow="Internal Workspace"
      icon="payments"
      title="Financial operations are empty until real payout data is loaded."
      description="Mock revenue totals, fee summaries, and owner payouts have been removed. This screen should be connected to production statements and payout workflows before it is used."
    />
  );
}
