/*
  Warnings:

  - Added the required column `name` to the `GiftItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `GiftItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftItem" ADD COLUMN     "name" STRING NOT NULL;
ALTER TABLE "GiftItem" ADD COLUMN     "notes" STRING NOT NULL;
ALTER TABLE "GiftItem" ADD COLUMN     "url" STRING;
