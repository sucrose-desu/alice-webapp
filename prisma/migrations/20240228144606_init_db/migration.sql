-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "displayName" TEXT NOT NULL DEFAULT 'diaplay name',
    "avatar" TEXT NOT NULL DEFAULT 'https://i.pravatar.cc/320',
    "bio" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "category" TEXT NOT NULL DEFAULT 'cinema',
    "groupId" UUID NOT NULL,
    "seasonNo" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "releaseAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "seasonNo" INTEGER NOT NULL DEFAULT 1,
    "episodeNo" INTEGER NOT NULL DEFAULT 1,
    "duration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skip" JSON,
    "filePath" TEXT NOT NULL,
    "fileSize" DOUBLE PRECISION NOT NULL,
    "chunkSize" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch" (
    "id" UUID NOT NULL,
    "seekTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'new',
    "userId" INTEGER NOT NULL,
    "trackId" UUID NOT NULL,

    CONSTRAINT "watch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_genreOfAlbum" (
    "id" SERIAL NOT NULL,
    "albumId" UUID NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_genreOfAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genres_text_key" ON "genres"("text");

-- CreateIndex
CREATE UNIQUE INDEX "albums_name_key" ON "albums"("name");

-- CreateIndex
CREATE INDEX "albums_name_description_idx" ON "albums"("name", "description");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_title_key" ON "tracks"("title");

-- CreateIndex
CREATE INDEX "tracks_title_description_idx" ON "tracks"("title", "description");

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch" ADD CONSTRAINT "watch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch" ADD CONSTRAINT "watch_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genreOfAlbum" ADD CONSTRAINT "_genreOfAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genreOfAlbum" ADD CONSTRAINT "_genreOfAlbum_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
