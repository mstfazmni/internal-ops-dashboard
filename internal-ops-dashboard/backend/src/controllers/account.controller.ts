import { Request, Response } from "express";
import { getAccountTransactions } from "../services/getAccountTransaction.service";

export async function getAccountTransactionsController(
    req: Request,
    res: Response
) {
    // handle potential errors with try-catch
    try {
        // first find out which account id is requesting the transactions
        const accountId = req.params.id as string;

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
}