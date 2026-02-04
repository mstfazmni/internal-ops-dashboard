export async function fetchAccountTransactions (
    accountId: string,
    page: number,
    limit: number
) {
    const response = await fetch(
        `http://localhost:3000/accounts/${accountId}/transactions?page=${page}&limit=${limit}`
    );

    if(!response.ok) {
        throw new Error("Failed to fetch account transactions")
    }

    return response.json();
}