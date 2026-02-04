import { useAccountTransactions } from "../hooks/useAccountTransactions"

type Props = {
    accountId: string
}

export function TransactionsList ({ accountId } : Props) {
    const { data, loading, error } = useAccountTransactions(accountId);

    if (loading) return <p>Loading transactions...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (data.length === 0) return <p>No transactions found.</p>

    return (
        <div style={{ marginTop: 24 }}>
            <h4>Transactions</h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {data.map((tx) => {
                    // if it is owed = red and negative 
                    const isDebit = tx.amount < 0;

                    return (    
                        <li 
                            key={tx.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px 12px",
                                marginBottom: "6px",
                                borderRadius: "6px",
                                backgroundColor: "#787878",
                            }}
                        >
                        <span>
                            {new Date(tx.createdAt).toLocaleDateString()}
                        </span>

                        <span
                            style={{
                                color: isDebit ? "#dc2626" : "#16a34a",
                                fontWeight: 600,
                            }}
                        >
                            {isDebit ? "-" : "+"}${Math.abs(tx.amount)}
                        </span>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}