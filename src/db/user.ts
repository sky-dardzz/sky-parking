import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOneUser(clerkId: string) {
  const user = await prisma.user.findFirst({
    where: {
      clerkId: clerkId,
    },
  });
  return user;
}
