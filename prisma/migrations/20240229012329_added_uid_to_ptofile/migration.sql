/*
  Warnings:

  - Added the required column `uid` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "uid" TEXT NOT NULL;
