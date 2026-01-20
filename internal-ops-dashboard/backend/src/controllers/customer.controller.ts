import { Request, Response } from "express";
import { getCustomerSummary } from "../services/getCustomerSummary.service";
import { getCustomerAccounts } from "../services/getCustomerAccounts.service";
import { createCustomerFlag } from "../services/createCustomerFlag.service";
import { getCustomerFlags } from "../services/getCustomerFlags.service";
import { createCustomerNote } from "../services/createCustomerNote.service";
import { getCustomerNotes } from "../services/getCustomerNotes.service";

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

// Controller to handle getting customer accounts
export async function getCustomerAccountsController(
    req: Request,
    res: Response
) {
    // handle potential errors with try-catch
    try {
        // first find out which customer id is requesting the accounts
        const customerId = req.params.id as string;
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
}

// Controller to handle creating a customer flag
export async function createCustomerFlagController(
    req: Request,
    res: Response
) {
    try {   
        // first find out which customer id is requesting the flag creation
        const customerId = req.params.id as string;
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
}

// Controller to handle getting customer flags
export async function getCustomerFlagsController(
    req: Request,
    res: Response
) {
    try {
        // first find out which customer id is requesting the flags
        const customerId = req.params.id as string;

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
}

// Controller to handle creating a customer note
export async function createCustomerNoteController(
    req: Request,
    res: Response
) {
    try {
        // first find out which customer id is requesting the note creation
        const customerId = req.params.id as string;
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
}

// Controller to handle getting customer notes
export async function getCustomerNotesController(
    req: Request,
    res: Response
) {
        try {
        // first find out which customer id is requesting the notes
        const customerId = req.params.id as string;
        // default pagination parameters if not provided
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        // call the service to get the notes
        const notes = await getCustomerNotes(customerId, page, limit);

        if (!notes) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}






// Notice:
// Controller knows about req and res
// Controller handles HTTP errors
// Controller calls the service and gets data