import { useCustomerAccounts } from "../hooks/useCustomerAccounts";

type Props = {
    customerId: string;
    onSelectAccount: (accountId: string) => void
};

export function AccountsList ({ customerId, onSelectAccount }: Props) {
    const { data, loading, error } = useCustomerAccounts(customerId);

    if (loading) return <p>Loading accounts...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (data.length === 0) return <p>No accounts found.</p>

    return (
        <div>
            <h3>Accounts</h3>
            <ul>
                {data.map((account) => (
                    <li 
                        key={account.id}
                        onClick={() => onSelectAccount(account.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <strong>{account.type}</strong> — $
                        {account.balance} ({account.status})
                    </li>
                ))}
            </ul>
        </div>
    );
}