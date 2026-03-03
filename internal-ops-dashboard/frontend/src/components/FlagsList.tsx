import { useCustomerFlags } from "../hooks/useCustomerFlags";

type Props = {
    customerId: string;
}

export function FlagsList({ customerId }: Props) {
  const {
    flags,
    page,
    totalPages,
    loading,
    error,
    canNext,
    canPrev,
    nextPage,
    prevPage,
  } = useCustomerFlags(customerId);

  if (loading)
    return <div className="text-muted text-center mt-4">Loading flags...</div>;

  if (error)
    return <div className="alert alert-danger mt-3 text-center">{error}</div>;

  if (!flags || flags.length === 0)
    return <div className="text-muted text-center mt-4">No flags found.</div>;


    return (
        <div className="flags-wrapper">
            <div className="flags-header">
                <h6 className="fw-semibold mb-0">Customer Flags</h6>
                <span className="text-muted small">
                Page {page} of {totalPages}
                </span>
            </div>

            <div className="flags-container">
                {flags.map((flag) => {
                const formattedDate = new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                }).format(new Date(flag.createdAt));

                return (
                    <div key={flag.id} className="flag-row">
                    <div className="flag-reason">{flag.reason}</div>
                    <div className={`flag-severity ${flag.severity.toLowerCase()}`}>
                        {flag.severity}
                    </div>
                    <div className="flag-date">{formattedDate}</div>
                    </div>
                );
                })}
            </div>

            <div className="flags-pagination">
                <button onClick={prevPage} disabled={!canPrev || loading}>
                Previous
                </button>

                <span className="text-muted small">
                {page} / {totalPages}
                </span>

                <button onClick={nextPage} disabled={!canNext || loading}>
                Next
                </button>
            </div>
        </div>
    );
}