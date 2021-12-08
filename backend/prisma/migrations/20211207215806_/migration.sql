/*
  Warnings:

  - The values [Booked] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `transactionId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('BOOKED');
ALTER TABLE "Transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT 'BOOKED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_transactionId_fkey";

-- DropIndex
DROP INDEX "Account_name_transactionId_key";

-- DropIndex
DROP INDEX "Account_transactionId_key";

-- DropIndex
DROP INDEX "Category_name_transactionId_key";

-- DropIndex
DROP INDEX "Category_transactionId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "status" SET DEFAULT E'BOOKED';

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
