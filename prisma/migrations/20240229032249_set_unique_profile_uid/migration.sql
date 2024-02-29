/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "isActive" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_uid_key" ON "profiles"("uid");
