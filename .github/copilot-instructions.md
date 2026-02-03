# Copilot Instructions for Internal Ops Dashboard

## Architecture Overview
This is a full-stack fintech dashboard with role-based access (Support, Analysts, Admins) for viewing customer profiles, transactions, and performing actions like flagging/freeze.

- **Backend**: Node.js/Express/TypeScript with Prisma ORM (PostgreSQL). Services handle business logic, controllers manage HTTP, routes define endpoints.
- **Frontend**: React/Vite/TypeScript. Components in `src/components/`, data fetching via hooks in `src/hooks/`, API calls in `src/api/`.
- **Data Flow**: Frontend hooks call API functions → fetch to backend routes → controllers call services → services use Prisma for DB queries.

Key files:
- `backend/src/server.ts`: Express app setup, CORS for localhost:5173, routes mounted at /customers and /accounts.
- `backend/prisma/schema.prisma`: Models Customer, Account, Transaction, Note, Flag with relations.
- `frontend/src/app/App.tsx`: Simple layout with CustomerPage.
- `backend/src/services/`: Pure functions for business logic, e.g., `getCustomerSummary.service.ts` calculates risk from flags count.

## Developer Workflows
- **Run Backend**: `cd backend && npm run dev` (ts-node-dev on port 3000).
- **Run Frontend**: `cd frontend && npm run dev` (Vite on port 5173).
- **DB Setup**: `cd backend && npx prisma migrate dev` for migrations, `npx prisma db seed` for data, `npx prisma studio` for GUI.
- **Build**: Backend `npm run build` (tsc), Frontend `npm run build` (tsc + vite).
- **Lint**: Frontend `npm run lint` (ESLint).

No tests configured; focus on manual testing.

## Conventions & Patterns
- **Backend Services**: Pure functions, no Express deps. Import `prisma` from `../prisma.ts`, handle errors in controllers.
- **Controllers**: Try-catch, call services, return JSON or 404/500.
- **Routes**: Express Router, RESTful paths like `/customers/:id/summary`.
- **Frontend Hooks**: Custom hooks for data fetching, e.g., `useCustomerAccounts` calls `fetchCustomerAccounts` from API.
- **API Layer**: Functions like `fetchCustomerSummary` using fetch to `http://localhost:3000/...`.
- **Types**: Interfaces in `src/types/`, match backend responses (e.g., `CustomerSummary`).
- **Risk Logic**: In `backend/src/utils/risk.ts`, `calculateRiskStatus` based on flags count (0: normal, >0: flagged).
- **Prisma Enums**: Use `CustomerStatus.ACTIVE`, not strings.

## Integration Points
- **DB**: PostgreSQL via Prisma. Relations: Customer has many Accounts/Notes/Flags, Account has many Transactions.
- **CORS**: Backend allows localhost:5173 for dev.
- **No Auth Yet**: Role-based mentioned but not implemented; assume future JWT.

Focus on customer-centric features: summary, accounts, transactions, flags, notes.