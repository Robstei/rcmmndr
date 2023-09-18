"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { Session } from "next-auth";
import { LikeButton } from "./LikeButton";
import { WebPlaybackTrack } from "./schemas/webPlaybackTrack";
import { PrimaryButton } from "./PrimaryButton";
import { Slider } from "./Slider";
import { SeedSearchArtist } from "./seeds/SeedSearchArtist";
import { SeedSearchTrack } from "./seeds/SeedSearchTrack";
import { SeedGenre } from "./seeds/SeedSearchGenre";
import { VariableSlider } from "./VariableSlider";
import { useRecommendationStore } from "@/stores/RecommendationStore";

type props = { session: Session };

function WebPlayback({ session }: props) {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState<WebPlaybackTrack>();
  const [volume, setVolume] = useState(20);
  const recomendationStore = useRecommendationStore();

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
        setTrack(WebPlaybackTrack.parse(state.track_window.current_track));
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
      }
    );
    const trackJson = await trackData.json();
    const trackId = trackJson.item.id;
    const trackAudioData = await fetch(
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      }
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
      }
    );
    const trackJson = await trackData.json();
    const trackId = trackJson.item.id;
    const recommendationsRaw = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.spotifyAccessToken} `,
        },
      }
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

  if (!current_track) {
    return <Script src="https://sdk.scdn.co/spotify-player.js" />;
  }

  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      <div className="flex justify-center">
        <div className="flex flex-col mt-10 max-w-lg bg-black/80 p-10">
          <div className="relative aspect-square w-full  max-w-md mx-auto">
            <Image
              src={
                current_track.album.images[0].url
                  ? current_track.album.images[0].url
                  : "/loader.gif"
              }
              alt=""
              fill={true}
            />
          </div>
          <div className="flex justify-around items-center mt-5">
            <LikeButton
              className="w-1/5"
              like={false}
              trackId={current_track?.id}
            />
            <div>
              <div>{current_track.name}</div>

              <div>{current_track.artists[0].name}</div>
            </div>
            <LikeButton
              className="w-1/5"
              like={true}
              trackId={current_track?.id}
            />
          </div>
          <div className="mt-5 flex items-center">
            <PrimaryButton
              className="w-32"
              onClick={() => {
                if (player) player.togglePlay();
              }}
            >
              {is_paused ? "PLAY" : "PAUSE"}
            </PrimaryButton>
            <Slider
              className="grow ml-5"
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={(e) => {
                player?.setVolume(+e.target.value);
                setVolume(+e.target.value);
              }}
            >
              <svg
                className="fill-current mr-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="0 -960 960 960"
                width="40"
              >
                <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
              </svg>
            </Slider>
          </div>
          <div className="mt-10">
            <div className="text-4xl font-bold">Generel</div>
            <div className="flex items-center mt-5">
              <input className="w-10 h-10" type="checkbox" id="playlist" />
              <label className="ml-5" htmlFor="playlist">
                Add Liked Song to Playlist called Fancy App Name
              </label>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-4xl font-bold">Seeds</div>
            <div className="text-3xl">Genre</div>
            <SeedGenre />
            <div className="text-3xl">Artist</div>
            <SeedSearchArtist />
            <div className="text-3xl">Track</div>
            <SeedSearchTrack />
          </div>
          <div className="mt-10">
            <div className="text-3xl">Variables</div>
            <VariableSlider
              name="acousticness"
              min="0"
              max="1"
              step="0.01"
              value={recomendationStore.acousticness}
              onChange={(e) =>
                recomendationStore.setAcousticness(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="main-wrapper">
          <div className="now-playing__side"></div>
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
