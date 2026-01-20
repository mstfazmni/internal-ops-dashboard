// import express framework
import express from "express";
// import customer routes
import customerRoutes from "./routes/customer.routes";


// import service to get account transactions
import { getAccountTransactions } from "./services/getAccountTransaction.service";

// initialize express app
const app = express();
// middleware to parse JSON bodies
app.use(express.json());


// *********Defining API endpoints (HTTP Routes)*********

// use customer routes for /customers path
// This means that any request to /customers will be handled by customerRoutes.
app.use("/customers", customerRoutes);


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

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})