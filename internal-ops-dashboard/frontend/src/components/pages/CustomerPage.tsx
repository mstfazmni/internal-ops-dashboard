import { CustomerSummary } from "../CustomerSummary";

export function CustomerPage() {
    return (
        <div className="customer-page">
            <CustomerSummary customerId="2c9d2b91-0050-4d79-80cc-bca6d6475879" />
        </div>
    )
}

// Later this page will also render:
// AccountsList
// FlagsList
// Transactions