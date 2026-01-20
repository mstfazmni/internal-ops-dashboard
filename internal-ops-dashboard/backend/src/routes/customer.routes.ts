//  This imports the Router tool from Express.
import { Router } from "express";
// Import the controllers
import { 
    getCustomerSummaryController, 
    getCustomerAccountsController, 
    createCustomerFlagController, 
    getCustomerFlagsController, 
    createCustomerNoteController, 
    getCustomerNotesController, 
} from "../controllers/customer.controller";



// initialize router
// This creates a new mini‑app that can have its own routes.
const router = Router();

// When someone hits /customers/:id/summary, run that controller.
router.get("/:id/summary", getCustomerSummaryController);

// When someone hits /customers/:id/accounts, run that controller.
router.get("/:id/accounts", getCustomerAccountsController);

// When someone hits /customers/:id/flags, run that controller.
router.post("/:id/flags", createCustomerFlagController);

// When someone hits /customers/:id/flags, run that controller.
router.get("/:id/flags", getCustomerFlagsController);

// When someone hits /customers/:id/notes, run that controller.
router.post("/:id/notes", createCustomerNoteController);

// When someone hits /customers/:id/notes, run that controller.
router.get("/:id/notes", getCustomerNotesController);

export default router;