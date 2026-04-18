import PortalEmptyState from '../../components/portal/PortalEmptyState';

export default function OwnerEarnings() {
  return (
    <PortalEmptyState
      eyebrow="Owner Portal"
      icon="payments"
      title="Earnings and payout history will appear here once financial data is connected."
      description="Mock balances, payout dates, statement downloads, and revenue charts have been removed. Populate this area from production payout and statement records before launch."
    />
  );
}
