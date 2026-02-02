export async function fetchCustomerAccounts (customerId: string) {
    const response = await fetch(
        `http://localhost:3000/customers/${customerId}/accounts`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch customer accounts")
    }

    return response.json();
}
    
