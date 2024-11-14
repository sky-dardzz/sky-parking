import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex px-10 py-5 justify-between items-center">
      <div className="flex justify-center items-center text-3xl font-bold text-skyparkPrimary">
        <Image
          alt="skypark-logo"
          width={50}
          height={50}
          src="/skypark-logo.png"
        />{" "}
      SKYPARK
      </div>
      <div>
        <SignedOut>
          <Button >
          <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
