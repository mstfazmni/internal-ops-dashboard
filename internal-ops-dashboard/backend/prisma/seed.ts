import { prisma } from "../src/prisma";

// main function to seed the database
async function main() {
    // create customer
    const customer = await prisma.customer.create({
        data: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            status: "ACTIVE",
        },
    });

    // create accounts for the customer
    const account1 = await prisma.account.create({
        data: {
            type: "SAVINGS",
            balance: 5000,
            status: "OPEN",
            customerId: customer.id,
        },
    });

    const account2 = await prisma.account.create({
        data: {
            type: "CHECKING",
            balance: 1500,
            status: "OPEN",
            customerId: customer.id,
        },
    });

    // create transactions for account1
    await prisma.transaction.createMany({
        data: [
            {
                amount: -200,
                accountId: account1.id,
            },
             {
                amount: 500,
                accountId: account1.id,
            },
        ],
    });

    // create transactions for account2
    await prisma.transaction.createMany({
        data: [
            {
                amount: -50,
                accountId: account2.id,
            },
            {
                amount: -100,
                accountId: account2.id,
            },
        ],
    });

    console.log("Seed data created successfully.");
}

// execute the main function and handle errors
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());