import { NextRequest, NextResponse } from "next/server";
import { ParkingAIData } from "./cv-data.type";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const data = (await req.json()) as { data: ParkingAIData };
  // check if parking space is already created
  const checkParkingSpace = await prisma.parkingSpace.findFirst({
    where: {
      parking_name: data.data.parking_space,
    },
  });

  if (checkParkingSpace) {
  }

  return NextResponse.json(
    {
      message: "Data received",
    },
    {
      status: 200,
    }
  );
}

