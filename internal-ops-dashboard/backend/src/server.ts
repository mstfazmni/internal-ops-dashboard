// import express framework
import express from "express";
// import service to get customer summary
import { getCustomerSummary } from "./services/customerSummary.service";

// initialize express app
const app = express();
// middleware to parse JSON bodies
app.use(express.json());

// endpoint to get customer summary by ID
app.get("/customers/:id/summary", async (req, res) => {
    // first find out which customer id is requesting the summary
    const customerId = req.params.id;
    const summary = await getCustomerSummary(customerId);

    if (!summary) {
        return res.status(404).json({ error: "Customer not found" });
    }

    return res.json(summary);
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})