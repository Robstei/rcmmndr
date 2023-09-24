/*
  Warnings:

  - You are about to drop the column `trackId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "trackId",
DROP COLUMN "userId";
