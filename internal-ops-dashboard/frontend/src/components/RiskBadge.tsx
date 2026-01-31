type RiskStatus = "NORMAL" | "REVIEW" | "HIGH_RISK";

export function RiskBadge({ status }: { status: RiskStatus }) {
  const styles: Record<RiskStatus, React.CSSProperties> = {
    NORMAL: { color: "green", fontWeight: "bold" },
    REVIEW: { color: "orange", fontWeight: "bold" },
    HIGH_RISK: { color: "red", fontWeight: "bold" },
  };

  return <span style={styles[status]}>{status}</span>;
}
