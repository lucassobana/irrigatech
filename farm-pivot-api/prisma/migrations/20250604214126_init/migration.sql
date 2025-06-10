/*
  Warnings:

  - Added the required column `direction` to the `Pivot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressure` to the `Pivot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Pivot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `PivotStatusHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressure` to the `PivotStatusHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `PivotStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pivot" ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "pressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "speed" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PivotStatusHistory" ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "pressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "speed" DOUBLE PRECISION NOT NULL;
