export async function fetchCustomerSummary(customerId: string) {
    const response = await fetch(
        `https://localhost:3000/customers/${customerId}/summary`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch customer summary");
    }

    return response.json();
}