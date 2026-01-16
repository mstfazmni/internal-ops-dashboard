// import express framework
import express from "express";
// import service to get customer summary
import { getCustomerSummary } from "./services/customerSummary.service";
// import service to get customer accounts
import { getCustomerAccounts } from "./services/customerAccounts.service";

// initialize express app
const app = express();
// middleware to parse JSON bodies
app.use(express.json());

// endpoint to get customer summary by ID
app.get("/customers/:id/summary", async (req, res) => {
    // handle potential errors with try-catch
    try {
        // first find out which customer id is requesting the summary
        const customerId = req.params.id;
        const summary = await getCustomerSummary(customerId);

        if (!summary) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
    
});

// endpoint to get customer accounts by ID
app.get("/customers/:id/accounts", async (req, res) => {
    try {
        const customerId = req.params.id;
        const accounts = await getCustomerAccounts(customerId);

        if (!accounts) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})