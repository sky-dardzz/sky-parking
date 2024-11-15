import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const parkingSpace = req.nextUrl.searchParams.get("parkingSpace");
  console.log("test");
  if (!parkingSpace) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 }
    );
  }
  const slots = await prisma.parkingSpace.findFirst({
    where: {
      parking_name: parkingSpace,
    },
    include: {
      parking_slot: true,
    },
  });
  return NextResponse.json(
    {
      data: slots,
    },
    { status: 200 }
  );
}
