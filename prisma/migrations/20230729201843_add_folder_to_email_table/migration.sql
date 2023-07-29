/*
  Warnings:

  - Added the required column `folder` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN "folder" TEXT; -- add column as nullable
UPDATE "Email" SET "folder" = 'standard'; -- set default value
ALTER TABLE "Email" ALTER COLUMN "folder" SET NOT NULL; -- change column to NOT NULL

