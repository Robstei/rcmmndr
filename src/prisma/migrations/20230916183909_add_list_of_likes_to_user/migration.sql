-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_trackId_fkey";

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
