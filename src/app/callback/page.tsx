"use client";

import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  const searchParams = useSearchParams();
  const [requestStatus, setReqestStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const code = searchParams?.get("code");
  const state = searchParams?.get("state");
  const storedState = getCookie("state");
  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      if (state === storedState) {
        const response = await fetch(`/api/callback?code=${code}`);
        const data = await response.json();
        if (data.accessToken && data.refreshToken) {
          setCookie("accessToken", data.accessToken);
          setCookie("refreshToken", data.refreshToken);
          setReqestStatus("success");
          return;
        }
      }
      if (!(getCookie("accessToken") && getCookie("refreshToken"))) {
        console.log("error");
        setReqestStatus("error");
      }
    }

    getToken();
  });

  useEffect(() => {
    if (requestStatus === "success") {
      router.push("/");
    }
  });

  function renderElements() {
    if (requestStatus === "pending") {
      return <h1>Authenticating</h1>;
    } else if (requestStatus === "error") {
      return (
        <div>
          <h1>Error</h1>
          <Link href="/">Back to Home Page</Link>
        </div>
      );
    }
  }

  return renderElements();
}
