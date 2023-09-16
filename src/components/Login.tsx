"use client";

import { setCookie } from "cookies-next";

function Login() {
  function generateRandomString(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const handleClick = () => {
    let scope =
      "streaming user-read-email user-read-private user-read-currently-playing";
    let state = generateRandomString(16);
    setCookie("state", state);

    let auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
      scope: scope,
      redirect_uri: "http://localhost:3000/callback",
      state: state,
    });

    location.href =
      "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString();
  };

  return (
    <button className="btn-spotify" onClick={handleClick}>
      Login with Spotify
    </button>
  );
}

export default Login;
