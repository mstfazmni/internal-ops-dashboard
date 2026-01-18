import { prisma } from "../src/prisma";

//  main function to seed the database
//  seed.ts is not app code
//  It’s a one-time script to populate the database
//  You run it manually to create fake but realistic data
//  That’s how everyone tests pagination. No UI. No Postman magic.

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

    // create transactions for account1 25 rows to test pagination
    // 1: This creates an array with 25 empty slots.
    // 2: Now you loop through those 25 empty slots.
    // 3: This line alternates the amount:
        // If the index is even → -50
        // If the index is odd → 100
    // This code generates 25 fake transactions (alternating amounts) for one account and inserts them into the database so you can test pagination.
    const transactionForAccount1 = Array.from({ length: 25 }).map((_, i) => ({
        amount: i % 2 === 0 ? -50 : 100,
        accountId: account1.id,
    }));
    
    await prisma.transaction.createMany({
        data: transactionForAccount1,
    });

    // create transactions for account2 15 rows to test pagination
    const transactionsForAccount2 = Array.from({ length: 15 }).map((_, i) => ({
        amount: i % 2 === 0 ? -20 : 40,
        accountId: account2.id,
    }));

    await prisma.transaction.createMany({
        data: transactionsForAccount2,
    });


    console.log("Seed data created successfully.");
}

// execute the main function and handle errors
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());