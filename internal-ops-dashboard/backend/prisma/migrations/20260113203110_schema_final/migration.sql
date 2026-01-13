/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(14,2)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(14,2)`.

*/
-- CreateEnum
CREATE TYPE "FlagSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(14,2),
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Flag" ADD COLUMN     "severity" "FlagSeverity" NOT NULL DEFAULT 'LOW';

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,2);

-- CreateIndex
CREATE INDEX "Account_customerId_idx" ON "Account"("customerId");

-- CreateIndex
CREATE INDEX "Flag_customerId_idx" ON "Flag"("customerId");

-- CreateIndex
CREATE INDEX "Note_customerId_idx" ON "Note"("customerId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "Transaction"("accountId");
