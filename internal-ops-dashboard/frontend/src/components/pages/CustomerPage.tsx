import { useState } from "react";
import { CustomerSummary } from "../CustomerSummary";
import { AccountsList } from "../AccountsList";
import { TransactionsList } from "../TransactionsList";

export function CustomerPage() {
    const customerId = "2c9d2b91-0050-4d79-80cc-bca6d6475879";

    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

    return (
        <div className="customer-page">
            <CustomerSummary customerId={customerId} />

            <AccountsList 
                customerId={customerId}
                selectedAccountId={selectedAccountId}
                onSelectAccount={setSelectedAccountId}
            />

            {!selectedAccountId && (
                <p style={{ marginTop: 16 }}>
                    Select an account to view transactions.
                </p>
            )}

            {selectedAccountId && (
                <TransactionsList accountId={selectedAccountId}/>
            )}
        </div>
    );
}

// Later this page will also render:
// AccountsList
// FlagsList
// Transactions