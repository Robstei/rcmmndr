"use client";

import { signIn } from "next-auth/react";
import { PrimaryButton } from "./PrimaryButton";
import Image from "next/image";

export function SignInButton() {
  return (
    <PrimaryButton
      className="w-full"
      onClick={() => {
        signIn("spotify");
      }}
    >
      <Image
        className="inline mr-2"
        src="/spotify_icon.png"
        alt="spotify_icon"
        height={24}
        width={24}
      />
      Login with Spotify
    </PrimaryButton>
  );
}
