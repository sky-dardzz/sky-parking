-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParkingSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "parkingSpaceId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "long" REAL NOT NULL DEFAULT 0,
    "lat" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "ParkingSlot_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ParkingSlot" ("id", "label", "parkingSpaceId", "status") SELECT "id", "label", "parkingSpaceId", "status" FROM "ParkingSlot";
DROP TABLE "ParkingSlot";
ALTER TABLE "new_ParkingSlot" RENAME TO "ParkingSlot";
CREATE UNIQUE INDEX "ParkingSlot_label_key" ON "ParkingSlot"("label");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
