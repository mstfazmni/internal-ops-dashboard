import { useAccountTransactions } from "../hooks/useAccountTransactions";
import "../styles/TransactionsList.css";

type Props = {
    accountId: string
}

export function TransactionsList ({ accountId } : Props) {
    const { 
        transactions,
        totalPages, 
        loading, 
        error,
        page,
        canNext,
        canPrev,
        nextPage,
        prevPage 
    } = useAccountTransactions(accountId);

    if (loading)
        return <div className="text-muted text-center mt-4">Loading transactions...</div>;

    if (error)
        return <div className="alert alert-danger mt-3 text-center">{error}</div>;

    if (!transactions || transactions.length === 0)
        return <div className="text-muted text-center mt-4">No transactions found.</div>;

    return (
        <div className="transactions-wrapper">
            <div className="transactions-header">
                <h6 className="fw-semibold mb-0">Transactions</h6>
                <span className="text-muted small">
                Page {page} of {totalPages}
                </span>
            </div>

            <div className="transactions-container">
                {transactions.map((tx) => {
                const isDebit = tx.amount < 0;
                const formattedDate = new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                }).format(new Date(tx.createdAt));

                return (
                    <div key={tx.id} className="transaction-row">
                    <div className="transaction-date">{formattedDate}</div>

                    <div
                        className={`transaction-amount ${
                        isDebit ? "debit" : "credit"
                        }`}
                    >
                        {isDebit ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
                    </div>
                    </div>
                );
                })}
            </div>

            <div className="transactions-pagination">
                <button
                className="pagination-btn"
                onClick={prevPage}
                disabled={!canPrev || loading}
                >
                Previous
                </button>

                <span className="text-muted small">
                {page} / {totalPages}
                </span>

                <button
                className="pagination-btn"
                onClick={nextPage}
                disabled={!canNext || loading}
                >
                Next
                </button>
            </div>
        </div>
    )
}