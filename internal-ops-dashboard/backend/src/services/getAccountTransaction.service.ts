import { prisma } from "../prisma";

// service to get account transactions by account ID
export async function getAccountTransactions(
    accountId: string,
    page: number,
    limit: number
) {
    // first check if the account exists
    const account = await prisma.account.findUnique({
        where: { id: accountId }
    });

    // if account does not exist, return null
    if (!account) {
        return null;
    }

    // calculate offset for pagination
    const offset = (page - 1) * limit;

    // fetch transactions for the account
    const transactions = await prisma.transaction.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" },
        //Prisma uses:
        // skip → offset
        // take → limit
        skip: offset,
        take: limit
    });

    // get total count of transactions for potential further use
    const totalTransactions = await prisma.transaction.count({
        where: { accountId }
    })

    // return transactions along with pagination info
    // “I return paginated data with metadata including total count and total pages
    //  so the frontend can render pagination controls correctly.”
    return {
        data: transactions,
        page,
        limit,
        total: totalTransactions,
        totalPages: Math.ceil(totalTransactions / limit)
    };
}