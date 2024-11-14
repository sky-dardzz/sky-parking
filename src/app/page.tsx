import { getOneUser } from "@/db/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  const { redirectToSignIn } = await auth()
  if (!user) {
    redirectToSignIn()
    return
  }
  const checkRegistrationStatus = await getOneUser(user.id);
  if(!checkRegistrationStatus){
    redirect('/user-registration')
  }
  return (
    <div className="relative h-screen">

    </div>
  )
}
