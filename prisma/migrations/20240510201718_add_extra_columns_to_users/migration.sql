/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NONE', 'OC', 'HES', 'BOTH');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "amount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "document_type" "DocumentType" DEFAULT 'NONE',
ADD COLUMN     "pandadoc" TEXT DEFAULT '',
ADD COLUMN     "period" INTEGER DEFAULT 1,
ADD COLUMN     "subscription_type" "SubscriptionType" DEFAULT 'MONTHLY',
DROP COLUMN "role",
ADD COLUMN     "role" "Role" DEFAULT 'CLIENT';
