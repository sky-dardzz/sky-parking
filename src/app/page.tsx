import { getOneUser } from "@/db/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SearchInput from '../components/SearchInput';

export default async function Page() {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  if (!user) {
    redirectToSignIn();
    return;
  }
  const checkRegistrationStatus = await getOneUser(user.id);
  if (!checkRegistrationStatus) {
    redirect('/user-registration');
  }

  return (
    <div className="">
      {/* <h1 className="text-2xl font-semibold text-skyparkPrimary">Welcome, {user.firstName}</h1> */}
      <div className="relative w-full h-[500px] bg-[url(/gapo.webp)] bg-center bg-cover">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold text-white mb-4">Looking to park?</h1>
          <SearchInput />
        </div>
      </div>
    </div>
  );
}