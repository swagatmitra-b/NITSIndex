/*
  Warnings:

  - Added the required column `email` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "reason" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "email" TEXT NOT NULL;
