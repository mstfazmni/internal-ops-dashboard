import { useCustomerAccounts } from "../hooks/useCustomerAccounts";

type Props = {
    customerId: string;
    selectedAccountId: string | null;
    onSelectAccount: (accountId: string) => void
};

export function AccountsList ({ 
    customerId,
    selectedAccountId,
    onSelectAccount
 }: Props) {
    const { data, loading, error } = useCustomerAccounts(customerId);

    if (loading) return <p>Loading accounts...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (data.length === 0) return <p>No accounts found.</p>

    return (
        <div>
            <h3>Accounts</h3>
            <ul>
                {data.map((account) => {
                    const isSelected = account.id === selectedAccountId;

                    return (
                        <li 
                            key={account.id}
                            onClick={() => onSelectAccount(account.id)}
                            style={{ 
                                cursor: "pointer",
                                padding: "8px",
                                marginBottom: "6px",
                                borderRadius: "6px",
                                backgroundColor: isSelected ? "#aeaeae" : "transparent",
                                border: isSelected ? "1px solid #e9e9e9" : "1px solid transparent",
                            }}
                        >
                            <strong>{account.type}</strong> — ${account.balance} ({account.status})
                        </li>
                    );

                })}
            </ul>
        </div>
    );
}