import { useCustomerAccounts } from "../hooks/useCustomerAccounts";
import "../styles/AccountsList.css";

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

    if (loading)
        return <div className="text-muted text-center">Loading accounts...</div>;

    if (error)
        return <div className="alert alert-danger py-2 text-center">{error}</div>;

    if (!data || data.length === 0)
        return <div className="text-muted text-center">No accounts found.</div>;

    return (
        <div className="accounts-wrapper">
            <h6 className="accounts-title">Accounts</h6>

            <div className="accounts-container">
                {data.map((account) => {
                const isSelected = account.id === selectedAccountId;

                return (
                    <div
                    key={account.id}
                    onClick={() => onSelectAccount(account.id)}
                    className={`account-card ${
                        isSelected ? "account-card-selected" : ""
                    }`}
                    >
                    <div className="account-type">{account.type}</div>

                    <div className="account-balance">
                        ${account.balance.toLocaleString()}
                    </div>

                    <div className="account-status">{account.status}</div>
                    </div>
                );
                })}
            </div>
        </div>
    );
}