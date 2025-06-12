-- CreateTable
CREATE TABLE "EquipmentStatus" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentStatus_pkey" PRIMARY KEY ("id")
);
