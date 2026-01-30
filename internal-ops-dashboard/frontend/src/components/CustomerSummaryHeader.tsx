import type { CustomerSummary } from "../types/customer";

interface Props {
    customer: CustomerSummary
}
export function CustomerSummaryHeader ({customer}: Props) {

    return (
        <header>
            <div>
                <h1>{customer.name}</h1>
                <p>{customer.email}</p>
            </div>

            <div>
                <span data-role="status">Status: {customer.status}</span>
                <span data-role="risk">Risk: {customer.riskStatus}</span>
            </div>

            <div>
                <span data-role="flags">Flags: {customer.flagsCount}</span>
                <span data-role="notes">Notes: {customer.notesCount}</span>
            </div>

            <time dateTime={customer.createdAt}>Created: {customer.createdAt}</time>
        </header>       
    );
}