/*
  Warnings:

  - The `featured_image` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gallery` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `product_category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logo` column on the `shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `avatar` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `icon` on the `product_group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "featured_image",
ADD COLUMN     "featured_image" JSONB,
DROP COLUMN "gallery",
ADD COLUMN     "gallery" JSONB[];

-- AlterTable
ALTER TABLE "product_category" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "product_group" DROP COLUMN "icon",
ADD COLUMN     "icon" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "shop" DROP COLUMN "logo",
ADD COLUMN     "logo" JSONB;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar",
ADD COLUMN     "avatar" JSONB;
