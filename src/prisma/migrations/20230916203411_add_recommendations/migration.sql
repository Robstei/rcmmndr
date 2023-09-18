/*
  Warnings:

  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_trackId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropTable
DROP TABLE "Likes";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "liked" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "recomendationId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "likeId" TEXT,
    "userId" TEXT NOT NULL,
    "basedOnDefaultValues" BOOLEAN NOT NULL,
    "seedArtists" TEXT[],
    "seedGenres" TEXT[],
    "seedTracks" TEXT[],
    "targetAcousticness" DOUBLE PRECISION NOT NULL,
    "targetDanceability" DOUBLE PRECISION NOT NULL,
    "targetDuration_ms" INTEGER NOT NULL,
    "targetEnergy" DOUBLE PRECISION NOT NULL,
    "targetEnstrumentalness" DOUBLE PRECISION NOT NULL,
    "targetKey" INTEGER NOT NULL,
    "targetLiveness" DOUBLE PRECISION NOT NULL,
    "targetLoudness" DOUBLE PRECISION NOT NULL,
    "targetMode" INTEGER NOT NULL,
    "targetPopularity" INTEGER NOT NULL,
    "targetSpeechiness" DOUBLE PRECISION NOT NULL,
    "targetTempo" DOUBLE PRECISION NOT NULL,
    "targetTime_signature" INTEGER NOT NULL,
    "targetValence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_recomendationId_key" ON "Like"("recomendationId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_recomendationId_fkey" FOREIGN KEY ("recomendationId") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
