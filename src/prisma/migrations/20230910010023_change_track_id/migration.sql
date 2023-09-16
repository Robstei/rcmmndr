/*
  Warnings:

  - You are about to drop the column `spotifyId` on the `Track` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Track_spotifyId_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "spotifyId";
