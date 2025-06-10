-- DropForeignKey
ALTER TABLE "PivotStatusHistory" DROP CONSTRAINT "PivotStatusHistory_pivotId_fkey";

-- AddForeignKey
ALTER TABLE "PivotStatusHistory" ADD CONSTRAINT "PivotStatusHistory_pivotId_fkey" FOREIGN KEY ("pivotId") REFERENCES "Pivot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
