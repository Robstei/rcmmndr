/*
  Warnings:

  - You are about to drop the column `trackId` on the `Bars` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Beats` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Sections` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Segments` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Tatums` table. All the data in the column will be lost.
  - Added the required column `trackAnalysisId` to the `Bars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackAnalysisId` to the `Beats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackAnalysisId` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackAnalysisId` to the `Segments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackAnalysisId` to the `Tatums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bars" DROP CONSTRAINT "Bars_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Beats" DROP CONSTRAINT "Beats_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Sections" DROP CONSTRAINT "Sections_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Segments" DROP CONSTRAINT "Segments_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Tatums" DROP CONSTRAINT "Tatums_trackId_fkey";

-- AlterTable
ALTER TABLE "Bars" DROP COLUMN "trackId",
ADD COLUMN     "trackAnalysisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Beats" DROP COLUMN "trackId",
ADD COLUMN     "trackAnalysisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sections" DROP COLUMN "trackId",
ADD COLUMN     "trackAnalysisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Segments" DROP COLUMN "trackId",
ADD COLUMN     "trackAnalysisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tatums" DROP COLUMN "trackId",
ADD COLUMN     "trackAnalysisId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bars" ADD CONSTRAINT "Bars_trackAnalysisId_fkey" FOREIGN KEY ("trackAnalysisId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beats" ADD CONSTRAINT "Beats_trackAnalysisId_fkey" FOREIGN KEY ("trackAnalysisId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_trackAnalysisId_fkey" FOREIGN KEY ("trackAnalysisId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_trackAnalysisId_fkey" FOREIGN KEY ("trackAnalysisId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tatums" ADD CONSTRAINT "Tatums_trackAnalysisId_fkey" FOREIGN KEY ("trackAnalysisId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
