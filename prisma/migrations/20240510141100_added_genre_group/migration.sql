/*
  Warnings:

  - The `category` column on the `albums` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `watch` table. All the data in the column will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `poster` on table `albums` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accountId` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `watch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ROOT', 'ADMIN', 'MEMBER', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ANIME', 'CINEMA', 'MOVIE', 'UNKNOWN');

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "watch" DROP CONSTRAINT "watch_userId_fkey";

-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "poster" SET NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'ANIME';

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "userId",
ADD COLUMN     "accountId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "group" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "watch" DROP COLUMN "userId",
ADD COLUMN     "accountId" UUID NOT NULL;

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "displayName" TEXT NOT NULL DEFAULT 'diaplay name',
    "avatar" TEXT NOT NULL DEFAULT 'https://i.pravatar.cc/320',
    "bio" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'email',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_uid_key" ON "accounts"("uid");

-- CreateIndex
CREATE INDEX "accounts_uid_email_idx" ON "accounts"("uid", "email");

-- CreateIndex
CREATE INDEX "genres_text_idx" ON "genres"("text");

-- AddForeignKey
ALTER TABLE "watch" ADD CONSTRAINT "watch_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
