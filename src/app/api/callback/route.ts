import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (typeof code !== "string") {
    return;
  }
  const body = new URLSearchParams({
    code: code,
    redirect_uri: "http://localhost:3000/callback",
    grant_type: "authorization_code",
  });

  const test =
    "Basic " +
    Buffer.from(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
        ":" +
        process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

  console.log(test);
  const headers = {
    Authorization: test,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body,
    headers,
  });
  const data = await response.json();
  console.log(data);
  if (data.error) {
    return NextResponse.json({ error: data.error });
  }
  return NextResponse.json({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });
}
