/*
  Warnings:

  - You are about to drop the column `spotifyId` on the `Playlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyPlaylistId]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spotifyPlaylistId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Playlist_spotifyId_key";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "spotifyId",
ADD COLUMN     "spotifyPlaylistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_spotifyPlaylistId_key" ON "Playlist"("spotifyPlaylistId");
