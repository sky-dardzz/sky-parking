import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const parkingSpace = await prisma.parkingSpace.findMany({});
    if (!parkingSpace) {
      return NextResponse.json(
        {
          message: "No parking space found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        data: parkingSpace,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
