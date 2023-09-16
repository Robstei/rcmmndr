/*
  Warnings:

  - You are about to drop the column `trackId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_trackId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "trackId";

-- CreateTable
CREATE TABLE "_TrackToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrackToUser_AB_unique" ON "_TrackToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TrackToUser_B_index" ON "_TrackToUser"("B");

-- AddForeignKey
ALTER TABLE "_TrackToUser" ADD CONSTRAINT "_TrackToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrackToUser" ADD CONSTRAINT "_TrackToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
