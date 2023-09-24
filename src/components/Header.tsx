"use client";

import { signOut } from "next-auth/react";
import { PrimaryButton } from "./PrimaryButton";

export default function Header() {
  return (
    <div className="h-20 bg-slate-700 flex items-center	">
      <svg
        className="ml-5 color-red-500 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        height="40"
        viewBox="0 -960 960 960"
        width="50"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
      <div className="grow text-center">Rcmmndr</div>
      <PrimaryButton className="mr-5" onClick={() => signOut()}>
        Logout
      </PrimaryButton>
    </div>
  );
}
