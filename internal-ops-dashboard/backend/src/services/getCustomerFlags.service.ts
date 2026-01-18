import { prisma } from "../prisma";

export async function getCustomerFlags(customerId: string) {
    // check if customer exists
    const customer = await prisma.customer.findUnique({
        where: {  id: customerId  }
    });

    // if customer does not exist, return null
    if (!customer) {
        return null;
    }

    // fetch flags for the customer
    const flags = await prisma.flag.findMany({
        where: { customerId },
        orderBy: { createdAt: "desc" }
    });

    return flags;
}