/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `ParkingSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingSlot_label_key" ON "ParkingSlot"("label");
