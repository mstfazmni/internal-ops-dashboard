// import express framework
import express from "express";
// import prisma client instance
import { prisma } from "./prisma";
import { stat } from "node:fs";

// initialize express app
const app = express();
// middleware to parse JSON bodies
app.use(express.json());

// endpoint to get customer summary by ID
app.get("/customers/:id/summary", async (req, res) => {
    // first find out which customer id is requesting the summary
    const customerId = req.params.id;

    // fetch customer details from the database using findUnique
    const customer = await prisma.customer.findUnique({
        where: { id: customerId }
    });


    // handle case where customer is not found
    if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
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
    const riskStatus = flagsCount > 0 ? "SUSPICIOUS" : "NORMAL";

    // respond with the response details
    res.json({
        name: customer.fullName,
        email: customer.email,
        status: customer.status,
        riskStatus,
        flagsCount,
        notesCount,
        createdAt: customer.createdAt
    });
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})