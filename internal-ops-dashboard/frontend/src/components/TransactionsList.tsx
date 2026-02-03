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
        <div>
            <h4>Transactions</h4>
            <ul>
                {data.map((tx) => (
                    <li key={tx.id}>
                        <strong>
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount}
                        </strong>
                        {" — "}
                        {new Date(tx.createdAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}