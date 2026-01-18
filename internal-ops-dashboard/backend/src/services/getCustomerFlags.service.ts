import { prisma } from "../prisma";

export async function getCustomerFlags(
    customerId: string,
    page: number,
    limit: number
) {
    // check if customer exists
    const customer = await prisma.customer.findUnique({
        where: {  id: customerId  }
    });

    // if customer does not exist, return null
    if (!customer) {
        return null;
    }

    // calculate pagination offset
    const offset = (page - 1) * limit;

    // fetch paginated flags for the customer
    const flags = await prisma.flag.findMany({
        where: { customerId },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
    });

    // count total flags for the customer
    const totalFlags = await prisma.flag.count({
        where: { customerId }
    });

    // return flags along with pagination info
    return {
        data: flags,
        page,
        limit,
        total: totalFlags,
        totalPages: Math.ceil(totalFlags / limit)
    };
}