-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;