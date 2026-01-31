// import prisma client instance
import { prisma } from "../prisma";
// import risk calculation utility
import { calculateRiskStatus } from "../utils/risk";

// service to get customer summary by ID
// This function:
// Does one thing
// Has no Express
// Has no HTTP
// Can be reused anywhere
// Business logic
export async function getCustomerSummary(customerId: string) {
    // fetch customer details from the database using findUnique
    const customer = await prisma.customer.findUnique({
        where: { id: customerId }
    });

    // handle case where customer is not found
    if (!customer) {
        return null;
    }

    // fetch counts of related entities flags
    const flagsCount = await prisma.flag.count({
        where: { customerId }
    })

    // fetch counts of related entities notes
    const notesCount = await prisma.note.count({
        where: { customerId }
    });

    // risk status logic
    const riskStatus = calculateRiskStatus(flagsCount);

    // respond with the response details
    return {
        name: customer.fullName,
        email: customer.email,
        status: customer.status,
        riskStatus,
        flagsCount,
        notesCount,
        createdAt: customer.createdAt
    };
}

//Notice:
//Service does NOT know about res.status
//Service does NOT catch HTTP errors
//Service returns null or data