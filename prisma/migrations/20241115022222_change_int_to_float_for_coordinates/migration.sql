/*
  Warnings:

  - You are about to alter the column `latitude` on the `ParkingSpace` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `longitude` on the `ParkingSpace` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParkingSpace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL,
    "longitude" REAL,
    "parking_name" TEXT NOT NULL,
    "rate" INTEGER
);
INSERT INTO "new_ParkingSpace" ("id", "latitude", "longitude", "parking_name", "rate") SELECT "id", "latitude", "longitude", "parking_name", "rate" FROM "ParkingSpace";
DROP TABLE "ParkingSpace";
ALTER TABLE "new_ParkingSpace" RENAME TO "ParkingSpace";
CREATE UNIQUE INDEX "ParkingSpace_parking_name_key" ON "ParkingSpace"("parking_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
