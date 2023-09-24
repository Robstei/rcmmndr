/*
  Warnings:

  - Added the required column `name` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "name" TEXT NOT NULL;
