type RiskStatus = "NORMAL" | "REVIEW" | "HIGH_RISK";

// Component to display risk status badge
export function RiskBadge({ status }: { status: RiskStatus }) {
    // Define styles for each risk status
  const styles: Record<RiskStatus, React.CSSProperties> = {
    NORMAL: { color: "green", fontWeight: "bold" },
    REVIEW: { color: "orange", fontWeight: "bold" },
    HIGH_RISK: { color: "red", fontWeight: "bold" },
  };

  // Render the badge with appropriate style
  return <span style={styles[status]}>{status}</span>;
}
