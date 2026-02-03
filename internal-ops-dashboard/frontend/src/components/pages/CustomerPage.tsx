import { CustomerSummary } from "../CustomerSummary";
import { AccountsList } from "../AccountsList";

export function CustomerPage() {
    const customerId = "2c9d2b91-0050-4d79-80cc-bca6d6475879";
    return (
        <div className="customer-page">
            <CustomerSummary customerId={customerId} />
            <AccountsList customerId={customerId}/>
        </div>
    )
}

// Later this page will also render:
// AccountsList
// FlagsList
// Transactions