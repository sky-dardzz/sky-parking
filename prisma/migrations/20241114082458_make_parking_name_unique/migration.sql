/*
  Warnings:

  - A unique constraint covering the columns `[parking_name]` on the table `ParkingSpace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpace_parking_name_key" ON "ParkingSpace"("parking_name");
