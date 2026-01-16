// import express framework
import express from "express";
// import prisma client instance
import { prisma } from "./prisma";

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

    // respond with the customer details
    res.json(customer);
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})