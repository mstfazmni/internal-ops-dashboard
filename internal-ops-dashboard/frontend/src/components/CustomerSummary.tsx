import { useCustomerSummary } from "../hooks/useCustomerSummary";
import { RiskBadge } from "./RiskBadge";

type props = {
    customerId: string
};

export function CustomerSummary ({ customerId }: props) {
    const { data, loading, error } = useCustomerSummary(customerId);

    // Handle loading state
    if (loading) {
        return <div>Loading customer summary...</div>;
    }

    // Handle error state
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    // Handle empty data state
    if (!data) {
        return <div>No customer data available.</div>;
    }

    // Render customer summary
    return (
        <div>
            <h2>Name: {data.name}</h2>
            <p>Email: {data.email}</p>
            <p>Status: {data.status}</p>
            <p>
                Risk Status: <RiskBadge status={data.riskStatus}/> 
            </p>
            <p>Flags: {data.flagsCount}</p>
            <p>Notes: {data.notesCount}</p>
            <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
    );
}