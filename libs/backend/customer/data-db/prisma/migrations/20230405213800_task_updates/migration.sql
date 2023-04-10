/*
  Warnings:

  - You are about to drop the column `dateTime` on the `NonRecurringTask` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `NonRecurringTask` table. All the data in the column will be lost.
  - You are about to drop the `Constraint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConstraintToNonRecurringTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConstraintToRecurringTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coordinatePointId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `NonRecurringTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `NonRecurringTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Constraint" DROP CONSTRAINT "Constraint_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_ConstraintToNonRecurringTask" DROP CONSTRAINT "_ConstraintToNonRecurringTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConstraintToNonRecurringTask" DROP CONSTRAINT "_ConstraintToNonRecurringTask_B_fkey";

-- DropForeignKey
ALTER TABLE "_ConstraintToRecurringTask" DROP CONSTRAINT "_ConstraintToRecurringTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConstraintToRecurringTask" DROP CONSTRAINT "_ConstraintToRecurringTask_B_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "coordinatePointId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NonRecurringTask" DROP COLUMN "dateTime",
DROP COLUMN "priority",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Constraint";

-- DropTable
DROP TABLE "_ConstraintToNonRecurringTask";

-- DropTable
DROP TABLE "_ConstraintToRecurringTask";

-- CreateTable
CREATE TABLE "CoordinatePoint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "latitudeDirection" TEXT NOT NULL,
    "longitudeDirection" TEXT NOT NULL,

    CONSTRAINT "CoordinatePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalConstraint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "details" JSONB,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "GlobalConstraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskConstraint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "details" JSONB,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "TaskConstraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecurringTaskToTaskConstraint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NonRecurringTaskToTaskConstraint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecurringTaskToTaskConstraint_AB_unique" ON "_RecurringTaskToTaskConstraint"("A", "B");

-- CreateIndex
CREATE INDEX "_RecurringTaskToTaskConstraint_B_index" ON "_RecurringTaskToTaskConstraint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NonRecurringTaskToTaskConstraint_AB_unique" ON "_NonRecurringTaskToTaskConstraint"("A", "B");

-- CreateIndex
CREATE INDEX "_NonRecurringTaskToTaskConstraint_B_index" ON "_NonRecurringTaskToTaskConstraint"("B");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_coordinatePointId_fkey" FOREIGN KEY ("coordinatePointId") REFERENCES "CoordinatePoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalConstraint" ADD CONSTRAINT "GlobalConstraint_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskConstraint" ADD CONSTRAINT "TaskConstraint_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecurringTaskToTaskConstraint" ADD CONSTRAINT "_RecurringTaskToTaskConstraint_A_fkey" FOREIGN KEY ("A") REFERENCES "RecurringTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecurringTaskToTaskConstraint" ADD CONSTRAINT "_RecurringTaskToTaskConstraint_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskConstraint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NonRecurringTaskToTaskConstraint" ADD CONSTRAINT "_NonRecurringTaskToTaskConstraint_A_fkey" FOREIGN KEY ("A") REFERENCES "NonRecurringTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NonRecurringTaskToTaskConstraint" ADD CONSTRAINT "_NonRecurringTaskToTaskConstraint_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskConstraint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
