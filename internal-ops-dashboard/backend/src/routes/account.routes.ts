import { Router } from 'express';
import { get } from 'node:http';
import { getAccountTransactionsController } from '../controllers/account.controller';

// initialize router
// This creates a new mini‑app that can have its own routes.
const router = Router();

router.get("/:id/transactions", getAccountTransactionsController);

export default router;