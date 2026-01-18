import { prisma } from '../prisma';

export async function createCustomerNote(
    customerId: string,
    content: string
) {
    // check if customer exists
    const customer = await prisma.customer.findUnique({
        where: { id: customerId }
    });

    if (!customer) {
        return null;
    }

    // create the note
    const note = await prisma.note.create({
        data: {
            content,
            customerId
        }
    });

    return note;
}