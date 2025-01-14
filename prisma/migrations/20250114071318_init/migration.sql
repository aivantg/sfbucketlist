-- CreateTable
CREATE TABLE "BucketListItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "bucketListId" TEXT NOT NULL,

    CONSTRAINT "BucketListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BucketList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "BucketList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BucketList_key_key" ON "BucketList"("key");

-- AddForeignKey
ALTER TABLE "BucketListItem" ADD CONSTRAINT "BucketListItem_bucketListId_fkey" FOREIGN KEY ("bucketListId") REFERENCES "BucketList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
