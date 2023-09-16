"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  return (
    <div
      style={{
        height: 100,
        backgroundColor: "lightblue",
        display: "flex",
        alignItems: "center",
      }}
    >
      <button
        style={{ width: 100, marginLeft: "auto" }}
        onClick={() => {
          signIn("spotify");
        }}
      >
        Login With Spotify
      </button>
      <button
        style={{ width: 100, marginLeft: "auto" }}
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
