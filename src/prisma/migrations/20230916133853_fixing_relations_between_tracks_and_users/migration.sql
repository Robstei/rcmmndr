/*
  Warnings:

  - You are about to drop the column `trackAnalysisId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `trackFeaturesId` on the `Track` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackId]` on the table `TrackAnalysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId]` on the table `TrackFeatures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackId` to the `TrackAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `TrackFeatures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrackAnalysis" DROP CONSTRAINT "TrackAnalysis_id_fkey";

-- DropForeignKey
ALTER TABLE "TrackFeatures" DROP CONSTRAINT "TrackFeatures_id_fkey";

-- DropIndex
DROP INDEX "Track_trackAnalysisId_key";

-- DropIndex
DROP INDEX "Track_trackFeaturesId_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "trackAnalysisId",
DROP COLUMN "trackFeaturesId";

-- AlterTable
ALTER TABLE "TrackAnalysis" ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrackFeatures" ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "trackId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TrackAnalysis_trackId_key" ON "TrackAnalysis"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackFeatures_trackId_key" ON "TrackFeatures"("trackId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFeatures" ADD CONSTRAINT "TrackFeatures_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackAnalysis" ADD CONSTRAINT "TrackAnalysis_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
