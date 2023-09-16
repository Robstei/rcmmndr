"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { Session } from "next-auth";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

type props = { session: Session };

function WebPlayback({ session }: props) {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb) => {
          if (session?.user.spotifyAccessToken)
            cb(session?.user.spotifyAccessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);

        function takeControl() {
          fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ device_ids: [device_id] }),
          });
        }
        takeControl();
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [session?.user.spotifyAccessToken]);

  async function setTime() {
    const trackData = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      },
    );
    const trackJson = await trackData.json();
    const trackId = trackJson.item.id;
    const trackAudioData = await fetch(
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      },
    );
    const trackAudioDataJson = await trackAudioData.json();
    const sections = trackAudioDataJson.sections;
    if (player) player.seek(sections[2].start * 1000);
  }

  async function getRecomendations() {
    const trackData = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      },
    );
    const trackJson = await trackData.json();
    const trackId = trackJson.item.id;
    const recommendationsRaw = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      },
    );

    const recommendations = await recommendationsRaw.json();
    console.log(recommendations);
  }

  async function userLikedSong(userLikedSong: boolean) {
    await player?.nextTrack();

    const state = await player?.getCurrentState();
    const songId = state?.track_window.current_track.id;
    fetch("/api/spotify/likes", {
      method: "POST",
      body: JSON.stringify({
        songId: songId,
        liked: userLikedSong,
      }),
    });
  }

  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      <div className="container">
        <div className="main-wrapper">
          <Image
            src={
              current_track.album.images[0].url
                ? current_track.album.images[0].url
                : "/loader.gif"
            }
            className="now-playing__cover"
            alt=""
            width={100}
            height={100}
          />
          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn-spotify"
        onClick={() => {
          if (player) player.previousTrack();
        }}
      >
        &lt;&lt;
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          if (player) player.togglePlay();
        }}
      >
        {is_paused ? "PLAY" : "PAUSE"}
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          if (player) player.nextTrack();
        }}
      >
        &gt;&gt;
      </button>
      <button onClick={setTime}>Set to Interesting Time</button>
      <button onClick={getRecomendations}>Get Recomendations</button>
      <button
        onClick={() => {
          userLikedSong(true);
        }}
      >
        Like
      </button>
      <button
        onClick={() => {
          userLikedSong(false);
        }}
      >
        Dislike
      </button>
    </>
  );
}

export default WebPlayback;
