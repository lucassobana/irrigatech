-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pivot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "farmId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Pivot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PivotStatusHistory" (
    "id" SERIAL NOT NULL,
    "pivotId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PivotStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pivot" ADD CONSTRAINT "Pivot_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PivotStatusHistory" ADD CONSTRAINT "PivotStatusHistory_pivotId_fkey" FOREIGN KEY ("pivotId") REFERENCES "Pivot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
