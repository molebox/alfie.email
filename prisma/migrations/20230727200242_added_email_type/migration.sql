/*
  Warnings:

  - Added the required column `to` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmailType" AS ENUM ('SENT', 'RECEIVED');

-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "to" TEXT NOT NULL,
ADD COLUMN     "type" "EmailType" NOT NULL;
