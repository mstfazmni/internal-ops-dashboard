import { off } from 'node:cluster';
import { prisma } from '../prisma';

export async function getCustomerNotes(
    customerId: string,
    page: number,
    limit: number
) {
    // first find the customer to ensure they exist
    const customer = await prisma.customer.findUnique({
        where: { id: customerId }
    });

    // customer not found
    if (!customer) {
        return null;
    }

    const offset = (page - 1) * limit;

    const notes = await prisma.note.findMany({
        where: { customerId },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
    });

    const totalNotes = await prisma.note.count({
        where: { customerId }
    });

    return {
        data: notes,
        page,
        limit,
        total: totalNotes,
        totalPages: Math.ceil(totalNotes / limit)
    };
}