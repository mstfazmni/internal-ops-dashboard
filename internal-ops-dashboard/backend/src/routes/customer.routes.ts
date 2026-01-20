import { Router } from "express";
import { getCustomerSummaryController } from "../controllers/customer.controller";

// initialize router
const router = Router();

//  When someone hits /customers/:id/summary, run that controller.
router.get("/:id/summary", getCustomerSummaryController);

export default router;