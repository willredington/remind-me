/*
  Warnings:

  - You are about to drop the `TaskConstraint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NonRecurringTaskToTaskConstraint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecurringTaskToTaskConstraint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskConstraint" DROP CONSTRAINT "TaskConstraint_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_NonRecurringTaskToTaskConstraint" DROP CONSTRAINT "_NonRecurringTaskToTaskConstraint_A_fkey";

-- DropForeignKey
ALTER TABLE "_NonRecurringTaskToTaskConstraint" DROP CONSTRAINT "_NonRecurringTaskToTaskConstraint_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecurringTaskToTaskConstraint" DROP CONSTRAINT "_RecurringTaskToTaskConstraint_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecurringTaskToTaskConstraint" DROP CONSTRAINT "_RecurringTaskToTaskConstraint_B_fkey";

-- DropTable
DROP TABLE "TaskConstraint";

-- DropTable
DROP TABLE "_NonRecurringTaskToTaskConstraint";

-- DropTable
DROP TABLE "_RecurringTaskToTaskConstraint";
