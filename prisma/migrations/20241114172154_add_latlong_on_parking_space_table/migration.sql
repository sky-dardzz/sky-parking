/*
  Warnings:

  - You are about to drop the column `x_coordinates` on the `ParkingSpace` table. All the data in the column will be lost.
  - You are about to drop the column `y_coordinates` on the `ParkingSpace` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParkingSpace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "parking_name" TEXT NOT NULL,
    "rate" INTEGER
);
INSERT INTO "new_ParkingSpace" ("id", "parking_name", "rate") SELECT "id", "parking_name", "rate" FROM "ParkingSpace";
DROP TABLE "ParkingSpace";
ALTER TABLE "new_ParkingSpace" RENAME TO "ParkingSpace";
CREATE UNIQUE INDEX "ParkingSpace_parking_name_key" ON "ParkingSpace"("parking_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
