import { getOneUser } from "@/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }
  const checkRegistration = getOneUser(user.id)
  if (!checkRegistration) {
    return NextResponse.json(
      {
        registrationStatus: "incomplete",
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json(
    {
      registrationStatus: "complete",
    },
    { status: 200 }
  );
}
