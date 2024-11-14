-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParkingSpace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "x_coordinates" INTEGER,
    "y_coordinates" INTEGER,
    "parking_name" TEXT NOT NULL,
    "rate" INTEGER
);
INSERT INTO "new_ParkingSpace" ("id", "parking_name", "rate", "x_coordinates", "y_coordinates") SELECT "id", "parking_name", "rate", "x_coordinates", "y_coordinates" FROM "ParkingSpace";
DROP TABLE "ParkingSpace";
ALTER TABLE "new_ParkingSpace" RENAME TO "ParkingSpace";
CREATE UNIQUE INDEX "ParkingSpace_parking_name_key" ON "ParkingSpace"("parking_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
