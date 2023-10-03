"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [profileGenerated, setProfileGenerated] = useState(false);

  useEffect(() => {
    async function generateProfile() {
      await fetch("/api/spotify/generateProfile");
      setProfileGenerated(true);
    }
    generateProfile();
  }, []);

  useEffect(() => {
    if (profileGenerated) redirect("/");
  }, [profileGenerated]);
  return <h1>generating Profile</h1>;
}
