const LABELS: Record<string, string> = {
  awaiting_payment: "Awaiting payment",
  payment_submitted: "Payment submitted",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
  pending: "Pending review",
};

const TONES: Record<string, string> = {
  awaiting_payment: "bg-muted text-muted-foreground",
  payment_submitted: "bg-warning/15 text-warning",
  approved: "bg-success/15 text-success",
  rejected: "bg-destructive/15 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
  pending: "bg-warning/15 text-warning",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        TONES[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
