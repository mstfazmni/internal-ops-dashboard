// import express framework
import express from "express";
// import service to get customer summary
import { getCustomerSummary } from "./services/customerSummary.service";
// import service to get customer accounts
import { getCustomerAccounts } from "./services/customerAccounts.service";
// import service to get account transactions
import { getAccountTransactions } from "./services/accountTransaction.service";
import { get } from "node:http";

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
    // handle potential errors with try-catch
    try {
        // first find out which customer id is requesting the accounts
        const customerId = req.params.id;
        const accounts = await getCustomerAccounts(customerId);

        // if no accounts found, return 404
        if (!accounts) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // return the accounts
        res.json(accounts);
    } catch (error) {
        // log the error and return 500
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/accounts/:id/transactions", async (req, res) => {
    try {
        const accountId = req.params.id;
        const transactions = await getAccountTransactions(accountId);

        if (!transactions) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})