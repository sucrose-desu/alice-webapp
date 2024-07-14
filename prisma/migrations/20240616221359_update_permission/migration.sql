/*
  Warnings:

  - You are about to drop the column `groupId` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `seasonNo` on the `tracks` table. All the data in the column will be lost.
  - The required column `group` was added to the `albums` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "albums_name_description_idx";

-- DropIndex
DROP INDEX "tracks_title_description_idx";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "avatar" SET DEFAULT 'default-avatar.png';

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "groupId",
ADD COLUMN     "group" UUID NOT NULL;

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "seasonNo",
ALTER COLUMN "skip" SET DATA TYPE JSONB;

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canRead" BOOLEAN NOT NULL DEFAULT true,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_permissionOfAccount" (
    "id" SERIAL NOT NULL,
    "accountId" UUID NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_permissionOfAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "permissions_key_idx" ON "permissions"("key");

-- CreateIndex
CREATE INDEX "albums_name_idx" ON "albums"("name");

-- CreateIndex
CREATE INDEX "tracks_title_idx" ON "tracks"("title");

-- AddForeignKey
ALTER TABLE "_permissionOfAccount" ADD CONSTRAINT "_permissionOfAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permissionOfAccount" ADD CONSTRAINT "_permissionOfAccount_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
