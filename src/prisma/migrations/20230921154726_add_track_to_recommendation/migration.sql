/*
  Warnings:

  - Added the required column `trackId` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "trackId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
