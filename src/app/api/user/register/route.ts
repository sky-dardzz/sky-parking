import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const user = await currentUser();
  const clerk_client = await clerkClient();
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
  await clerk_client.users.updateUser(user.id, {
    firstName: data.first_name,
    lastName: data.last_name
  })
  return NextResponse.json(
    {
      message: "Success",
    },
    {
      status: 201,
    }
  );
}
