/*
  Warnings:

  - You are about to drop the column `acousticness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `analysis_channels` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `analysis_sample_rate` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `code_version` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `codestring` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `danceability` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `duration_ms` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `echoprint_version` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `echoprintstring` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `end_of_fade_in` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `instrumentalness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `key_confidence` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `liveness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `loudness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `mode_confidence` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `num_samples` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `offset_seconds` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `rhythm_version` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `rhythmstring` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `sample_md5` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `speechiness` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `start_of_fade_out` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `synch_version` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `synchstring` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `tempo` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `tempo_confidence` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `time_signature` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `time_signature_confidence` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `valence` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `window_seconds` on the `Track` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackFeaturesId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackAnalysisId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

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
ALTER TABLE "Track" DROP COLUMN "acousticness",
DROP COLUMN "analysis_channels",
DROP COLUMN "analysis_sample_rate",
DROP COLUMN "code_version",
DROP COLUMN "codestring",
DROP COLUMN "danceability",
DROP COLUMN "duration",
DROP COLUMN "duration_ms",
DROP COLUMN "echoprint_version",
DROP COLUMN "echoprintstring",
DROP COLUMN "end_of_fade_in",
DROP COLUMN "energy",
DROP COLUMN "instrumentalness",
DROP COLUMN "key",
DROP COLUMN "key_confidence",
DROP COLUMN "liveness",
DROP COLUMN "loudness",
DROP COLUMN "mode",
DROP COLUMN "mode_confidence",
DROP COLUMN "num_samples",
DROP COLUMN "offset_seconds",
DROP COLUMN "rhythm_version",
DROP COLUMN "rhythmstring",
DROP COLUMN "sample_md5",
DROP COLUMN "speechiness",
DROP COLUMN "start_of_fade_out",
DROP COLUMN "synch_version",
DROP COLUMN "synchstring",
DROP COLUMN "tempo",
DROP COLUMN "tempo_confidence",
DROP COLUMN "time_signature",
DROP COLUMN "time_signature_confidence",
DROP COLUMN "valence",
DROP COLUMN "window_seconds",
ADD COLUMN     "trackAnalysisId" TEXT,
ADD COLUMN     "trackFeaturesId" TEXT;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackFeatures" (
    "id" TEXT NOT NULL,
    "acousticness" DOUBLE PRECISION NOT NULL,
    "danceability" DOUBLE PRECISION NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "energy" DOUBLE PRECISION NOT NULL,
    "instrumentalness" DOUBLE PRECISION NOT NULL,
    "key" INTEGER NOT NULL,
    "liveness" DOUBLE PRECISION NOT NULL,
    "loudness" DOUBLE PRECISION NOT NULL,
    "mode" INTEGER NOT NULL,
    "speechiness" DOUBLE PRECISION NOT NULL,
    "tempo" DOUBLE PRECISION NOT NULL,
    "time_signature" INTEGER NOT NULL,
    "valence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TrackFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackAnalysis" (
    "id" TEXT NOT NULL,
    "num_samples" INTEGER NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "sample_md5" TEXT NOT NULL,
    "offset_seconds" INTEGER NOT NULL,
    "window_seconds" INTEGER NOT NULL,
    "analysis_sample_rate" INTEGER NOT NULL,
    "analysis_channels" INTEGER NOT NULL,
    "end_of_fade_in" DOUBLE PRECISION NOT NULL,
    "start_of_fade_out" DOUBLE PRECISION NOT NULL,
    "loudness" DOUBLE PRECISION NOT NULL,
    "tempo" DOUBLE PRECISION NOT NULL,
    "tempo_confidence" DOUBLE PRECISION NOT NULL,
    "time_signature" INTEGER NOT NULL,
    "time_signature_confidence" DOUBLE PRECISION NOT NULL,
    "key" INTEGER NOT NULL,
    "key_confidence" DOUBLE PRECISION NOT NULL,
    "mode" INTEGER NOT NULL,
    "mode_confidence" DOUBLE PRECISION NOT NULL,
    "codestring" TEXT NOT NULL,
    "code_version" DOUBLE PRECISION NOT NULL,
    "echoprintstring" TEXT NOT NULL,
    "echoprint_version" DOUBLE PRECISION NOT NULL,
    "synchstring" TEXT NOT NULL,
    "synch_version" DOUBLE PRECISION NOT NULL,
    "rhythmstring" TEXT NOT NULL,
    "rhythm_version" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TrackAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToTrack_AB_unique" ON "_ArtistToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToTrack_B_index" ON "_ArtistToTrack"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Track_trackFeaturesId_key" ON "Track"("trackFeaturesId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_trackAnalysisId_key" ON "Track"("trackAnalysisId");

-- AddForeignKey
ALTER TABLE "TrackFeatures" ADD CONSTRAINT "TrackFeatures_id_fkey" FOREIGN KEY ("id") REFERENCES "Track"("trackFeaturesId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackAnalysis" ADD CONSTRAINT "TrackAnalysis_id_fkey" FOREIGN KEY ("id") REFERENCES "Track"("trackAnalysisId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bars" ADD CONSTRAINT "Bars_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beats" ADD CONSTRAINT "Beats_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tatums" ADD CONSTRAINT "Tatums_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "TrackAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTrack" ADD CONSTRAINT "_ArtistToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTrack" ADD CONSTRAINT "_ArtistToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
