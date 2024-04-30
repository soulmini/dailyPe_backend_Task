/*
  Warnings:

  - A unique constraint covering the columns `[mob_num]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "active" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_mob_num_key" ON "User"("mob_num");
