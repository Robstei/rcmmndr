/*
  Warnings:

  - You are about to drop the column `songId` on the `Bars` table. All the data in the column will be lost.
  - You are about to drop the column `songId` on the `Beats` table. All the data in the column will be lost.
  - You are about to drop the column `songId` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the column `songId` on the `Sections` table. All the data in the column will be lost.
  - You are about to drop the column `songId` on the `Segments` table. All the data in the column will be lost.
  - You are about to drop the column `songId` on the `Tatums` table. All the data in the column will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trackId` to the `Bars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `Beats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `Likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `Segments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackId` to the `Tatums` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bars" DROP CONSTRAINT "Bars_songId_fkey";

-- DropForeignKey
ALTER TABLE "Beats" DROP CONSTRAINT "Beats_songId_fkey";

-- DropForeignKey
ALTER TABLE "Sections" DROP CONSTRAINT "Sections_songId_fkey";

-- DropForeignKey
ALTER TABLE "Segments" DROP CONSTRAINT "Segments_songId_fkey";

-- DropForeignKey
ALTER TABLE "Tatums" DROP CONSTRAINT "Tatums_songId_fkey";

-- AlterTable
ALTER TABLE "Bars" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Beats" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sections" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Segments" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tatums" DROP COLUMN "songId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "spotifyId" TEXT NOT NULL,
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
    "acousticness" DOUBLE PRECISION NOT NULL,
    "danceability" DOUBLE PRECISION NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "energy" DOUBLE PRECISION NOT NULL,
    "instrumentalness" DOUBLE PRECISION NOT NULL,
    "liveness" DOUBLE PRECISION NOT NULL,
    "speechiness" DOUBLE PRECISION NOT NULL,
    "valence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_spotifyId_key" ON "Track"("spotifyId");

-- AddForeignKey
ALTER TABLE "Bars" ADD CONSTRAINT "Bars_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beats" ADD CONSTRAINT "Beats_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tatums" ADD CONSTRAINT "Tatums_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
