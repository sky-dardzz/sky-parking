import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  const data = await req.json();
  const createUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      first_name: data.first_name,
      last_name: data.last_name,
      Car: {
        create: {
          car_color: data.car_color,
          car_type: data.car_type,
        },
      },
    },
  });
  if (!createUser) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      message: "Success",
    },
    {
      status: 201,
    }
  );
}
