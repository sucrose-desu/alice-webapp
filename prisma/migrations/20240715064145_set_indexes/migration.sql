-- DropIndex
DROP INDEX "tracks_title_idx";

-- CreateIndex
CREATE INDEX "_genreOfAlbum_albumId_genreId_idx" ON "_genreOfAlbum"("albumId", "genreId");

-- CreateIndex
CREATE INDEX "_permissionOfAccount_accountId_permissionId_idx" ON "_permissionOfAccount"("accountId", "permissionId");

-- CreateIndex
CREATE INDEX "favorites_accountId_albumId_idx" ON "favorites"("accountId", "albumId");

-- CreateIndex
CREATE INDEX "tracks_title_albumId_idx" ON "tracks"("title", "albumId");

-- CreateIndex
CREATE INDEX "watch_accountId_trackId_idx" ON "watch"("accountId", "trackId");
