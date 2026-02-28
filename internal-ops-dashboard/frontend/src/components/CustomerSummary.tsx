import { useCustomerSummary } from "../hooks/useCustomerSummary";
import { RiskBadge } from "./RiskBadge";

type props = {
    customerId: string
};

export function CustomerSummary ({ customerId }: props) {
    const { data, loading, error } = useCustomerSummary(customerId);

 if (loading)
    return (
      <div className="section-card text-muted">
        Loading customer summary...
      </div>
    );

  if (error)
    return (
      <div className="section-card alert alert-danger">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="section-card text-muted">
        No customer data available.
      </div>
    );

  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(data.createdAt));

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

        <div>
          <h5 className="mb-1 fw-semibold">{data.name}</h5>
          <div className="text-muted small">{data.email}</div>
        </div>

        <div>
          <div className="text-muted small mb-1">Risk</div>
          <RiskBadge status={data.riskStatus} />
        </div>

        <div>
          <div className="text-muted small">Status</div>
          <div className="fw-semibold">{data.status}</div>
        </div>

        <div>
          <div className="text-muted small">Flags</div>
          <div className="fw-semibold">{data.flagsCount}</div>
        </div>

        <div>
          <div className="text-muted small">Notes</div>
          <div className="fw-semibold">{data.notesCount}</div>
        </div>

        <div>
          <div className="text-muted small">Created</div>
          <div className="small">{formattedDate}</div>
        </div>

      </div>
    </div>
  );
}