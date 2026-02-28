import { useState } from "react";
import { CustomerSummary } from "../CustomerSummary";
import { AccountsList } from "../AccountsList";
import { TransactionsList } from "../TransactionsList";
import '../../styles/CustomerPage.css';

export function CustomerPage() {
    const customerId = "2c9d2b91-0050-4d79-80cc-bca6d6475879";

    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

    return (
        <div className="customer-page-wrapper">
            <div className="customer-page-container">

                <CustomerSummary customerId={customerId} />

                <div className="section-card">
                <AccountsList
                    customerId={customerId}
                    selectedAccountId={selectedAccountId}
                    onSelectAccount={setSelectedAccountId}
                />
                </div>

                <div className="section-card">
                {!selectedAccountId ? (
                    <div className="text-muted text-center py-4">
                    Select an account to view transactions.
                    </div>
                ) : (
                    <TransactionsList accountId={selectedAccountId} />
                )}
                </div>

            </div>
        </div>
    );
}

// Later this page will also render:
// AccountsList
// FlagsList
// Transactions