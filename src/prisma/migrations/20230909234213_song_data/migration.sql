-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- CreateTable
CREATE TABLE "Song" (
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

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bars" (
    "id" TEXT NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Bars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beats" (
    "id" TEXT NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Beats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sections" (
    "id" TEXT NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "loudness" DOUBLE PRECISION NOT NULL,
    "tempo" DOUBLE PRECISION NOT NULL,
    "tempo_confidence" DOUBLE PRECISION NOT NULL,
    "key" INTEGER NOT NULL,
    "key_confidence" DOUBLE PRECISION NOT NULL,
    "mode" DOUBLE PRECISION NOT NULL,
    "mode_confidence" DOUBLE PRECISION NOT NULL,
    "time_signature" INTEGER NOT NULL,
    "time_signature_confidence" DOUBLE PRECISION NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segments" (
    "id" TEXT NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "loudness_start" DOUBLE PRECISION NOT NULL,
    "loudness_max" DOUBLE PRECISION NOT NULL,
    "loudness_max_time" DOUBLE PRECISION NOT NULL,
    "loudness_end" INTEGER NOT NULL,
    "pitches" DOUBLE PRECISION[],
    "timbre" DOUBLE PRECISION[],
    "songId" TEXT NOT NULL,

    CONSTRAINT "Segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tatums" (
    "id" TEXT NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Tatums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_spotifyId_key" ON "Song"("spotifyId");

-- AddForeignKey
ALTER TABLE "Bars" ADD CONSTRAINT "Bars_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beats" ADD CONSTRAINT "Beats_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tatums" ADD CONSTRAINT "Tatums_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
