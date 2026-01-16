import { prisma } from "../prisma";

export async function getAccountTransactions(accountId: string) {
    const account = await prisma.account.findUnique({
        where: { id: accountId }
    });

    if (!account) {
        return null;
    }

    const transactions = await prisma.transaction.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" }
    })

    return transactions;
}