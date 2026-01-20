import { Request, Response } from "express";
import { getCustomerSummary } from "../services/getCustomerSummary.service";

// Controller to handle getting customer summary
export async function getCustomerSummaryController(
    req: Request,
    res: Response
) {
    // handle potential errors with try-catch
    try {
        // first find out which customer id is requesting the summary
        const customerId = req.params.id as string;
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
}