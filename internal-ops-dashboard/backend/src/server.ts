// import express framework
import express from "express";
// import service to get customer summary
import { getCustomerSummary } from "./services/customerSummary.service";
// import service to get customer accounts
import { getCustomerAccounts } from "./services/customerAccounts.service";
// import service to get account transactions
import { getAccountTransactions } from "./services/accountTransaction.service";
// import service to create customer flag
import { createCustomerFlag } from "./services/createCustomerFlag.service";
// import service to get customer flags
import { getCustomerFlags } from "./services/getCustomerFlags.service";
// import service to create customer note
import { createCustomerNote } from "./services/createCustomerNote.service";
import { create } from "node:domain";

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
        // call the service to get summary
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
        // call the service to get accounts
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

// endpoint to get account transactions by account ID
app.get("/accounts/:id/transactions", async (req, res) => {
    // handle potential errors with try-catch
    try {
        // first find out which account id is requesting the transactions
        const accountId = req.params.id;

        // get pagination parameters from query, default to page 1 and limit 5
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        // call the service to get transactions
        const transactions = await getAccountTransactions(
            accountId,
            page,
            limit
        );

        // “The API returns an empty array with 200 OK.
        // A 404 is only returned if the account itself doesn’t exist.”
        if (transactions === null) {
            return res.status(404).json({ error: "Account not found" });
        }

        // return the transactions
        res.json(transactions);
    } catch (error) {
        // log the error and return 500
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// endpoint to create a flag for a customer
app.post("/customers/:id/flags", async (req, res) => {
    try {   
        // first find out which customer id is requesting the flag creation
        const customerId = req.params.id;
        // extract reason from request body
        const { reason } = req.body;

        if (!reason) {
            // if reason is not provided, return 400. 
            // Why 400? 
            // Client sent bad input. That’s NOT a server error
            res.status(400).json({ error: "Reason is required" });
        }

        // call the service to create the flag
        const flag = await createCustomerFlag(customerId, reason);

        // if no flag is created, return 404
        if (!flag) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // return the created flag with 201 status
        res.status(201).json(flag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// endpoint to get flags for a customer
app.get("/customers/:id/flags", async (req, res) => {
    try {
        // first find out which customer id is requesting the flags
        const customerId = req.params.id;

        // default pagination parameters if not provided
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        // call the service to get the flags
        const flags = await getCustomerFlags(
            customerId,
            page,
            limit
        );

        // if no flags found, return 404
        if (!flags) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // If no flags → []
        // If flags exist → array of flags
        // If customer doesn’t exist → 404

        // return the flags
        res.json(flags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//endpoint to create a customer note
app.post("/customers/:id/notes", async (req, res) => {
    try {
        // first find out which customer id is requesting the note creation
        const customerId = req.params.id;
        // extract content from request body
        const { content } = req.body;

        if (!content) {
            res.status(400).json({ error: "Content is required" });
        }

        // call the service to create the note
        const note = await createCustomerNote(customerId, content);

        if (!note) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})