/*
  Warnings:

  - You are about to drop the column `coordinatePointId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `bedTimeEnd` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `bedTimeStart` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `CoordinatePoint` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitudeDirection` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeDirection` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_coordinatePointId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "coordinatePointId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "latitudeDirection" TEXT NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitudeDirection" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bedTimeEnd",
DROP COLUMN "bedTimeStart";

-- DropTable
DROP TABLE "CoordinatePoint";
