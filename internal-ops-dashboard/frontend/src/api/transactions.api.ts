export async function fetchAccountTransactions (accountId: string) {
    const response = await fetch(
        `http://localhost:3000/accounts/${accountId}/transactions`
    );

    if(!response.ok) {
        throw new Error("Failed to fetch account transactions")
    }

    return response.json();
}