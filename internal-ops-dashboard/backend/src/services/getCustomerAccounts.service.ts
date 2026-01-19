// import prisma client instance
import {prisma} from "../prisma";

// service to get customer accounts by customer ID
export async function getCustomerAccounts(customerId: string) {
    // first verify if customer exists
    const customer = await prisma.customer.findUnique({
        where: { id: customerId }
    });

    // if customer does not exist, return null
    if (!customer) {
        return null;
    }

    // fetch accounts associated with the customer
    const accounts = await prisma.account.findMany({
        where: {customerId}
    });

    // return the list of accounts
    return accounts;
}