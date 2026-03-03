export async function fetchCustomerFlags (
    customerId: string,
    page: number,
    limit: number
) {
    const response = await fetch(
        `http://localhost:3000/customers/${customerId}/flags?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch customer flags");
    }

    return response.json();
}