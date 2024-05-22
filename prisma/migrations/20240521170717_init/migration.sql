/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_userId_fkey";

-- AlterTable
ALTER TABLE "Leaderboard" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_email_key" ON "Leaderboard"("email");
