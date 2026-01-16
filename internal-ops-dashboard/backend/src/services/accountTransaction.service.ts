import { prisma } from "../prisma";

// service to get account transactions by account ID
export async function getAccountTransactions(accountId: string) {
    // first check if the account exists
    const account = await prisma.account.findUnique({
        where: { id: accountId }
    });

    // if account does not exist, return null
    if (!account) {
        return null;
    }

    // fetch transactions for the account
    const transactions = await prisma.transaction.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" }
    })

    // return the transactions
    return transactions;
}