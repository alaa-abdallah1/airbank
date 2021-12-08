/*
  Warnings:

  - You are about to alter the column `currency` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "currency" SET DATA TYPE VARCHAR(3);
