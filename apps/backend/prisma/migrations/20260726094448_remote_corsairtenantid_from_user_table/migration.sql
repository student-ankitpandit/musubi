/*
  Warnings:

  - You are about to drop the column `corsairTenantId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_corsairTenantId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "corsairTenantId";
