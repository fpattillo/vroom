/*
  Warnings:

  - You are about to drop the column `theme` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "theme";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "theme" TEXT DEFAULT 'light';
