"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { Session } from "next-auth";
import { LikeButton } from "./LikeButton";
import { WebPlaybackTrack } from "@/schemas/schemas";
import { PrimaryButton } from "./PrimaryButton";
import { Slider } from "./Slider";
import { SeedSearchArtist } from "./seeds/SeedSearchArtist";
import { SeedSearchTrack } from "./seeds/SeedSearchTrack";
import { SeedGenre } from "./seeds/SeedSearchGenre";
import { VariableSlider } from "./VariableSlider";
import { useRecommendationParameterStore } from "@/stores/RecommendationParamterStore";
import { setupSpotifyPlayer } from "@/lib/setupSpotifyPlayer";

function Player({ session }: { session: Session }) {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<WebPlaybackTrack>();
  const [volume, setVolume] = useState(0.1);
  const recommendationParameterStore = useRecommendationParameterStore();
  const [saveLikeToPlaylist, setSaveLikeToPlaylist] = useState(true);

  useEffect(() => {
    setupSpotifyPlayer(
      session.user.spotifyAccessToken,
      setPlayer,
      setActive,
      setCurrentTrack,
      setPaused
    );
  }, [session.user.id, session.user.spotifyAccessToken]);

  if (!is_active) {
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
                currentTrack?.album.images[0].url
                  ? currentTrack.album.images[0].url
                  : "/loader.gif"
              }
              alt=""
              sizes="300px"
              priority={true}
              fill={true}
            />
          </div>
          <div className="flex justify-around items-center mt-5">
            <LikeButton
              className="w-1/5"
              like={false}
              saveToPlaylist={saveLikeToPlaylist}
            />
            <div>
              <div>{currentTrack?.name}</div>

              <div>{currentTrack?.artists[0].name}</div>
            </div>
            <LikeButton
              className="w-1/5"
              like={true}
              saveToPlaylist={saveLikeToPlaylist}
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
              <input
                className="w-10 h-10"
                type="checkbox"
                checked={saveLikeToPlaylist}
                onChange={() => {
                  setSaveLikeToPlaylist(!saveLikeToPlaylist);
                }}
              />
              <label className="ml-5" htmlFor="playlist">
                Add liked songs to playlist called rcmmndr
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
              value={recommendationParameterStore.acousticness}
              onChange={(e) =>
                recommendationParameterStore.setAcousticness(e.target.value)
              }
            />
            <VariableSlider
              name="danceability"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.danceability}
              onChange={(e) =>
                recommendationParameterStore.setDanceability(e.target.value)
              }
            />
            <VariableSlider
              name="duration in seconds"
              min="0"
              max="300"
              step="1"
              value={String(+recommendationParameterStore.duration / 1000)}
              onChange={(e) =>
                recommendationParameterStore.setDuration(
                  String(+e.target.value * 1000)
                )
              }
            />
            <VariableSlider
              name="energy"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.energy}
              onChange={(e) =>
                recommendationParameterStore.setEnergy(e.target.value)
              }
            />
            <VariableSlider
              name="instrumentalness"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.instrumentalness}
              onChange={(e) =>
                recommendationParameterStore.setInstrumentalness(e.target.value)
              }
            />
            <VariableSlider
              name="key"
              min="0"
              max="11"
              step="1"
              value={recommendationParameterStore.key}
              onChange={(e) =>
                recommendationParameterStore.setKey(e.target.value)
              }
            />
            <VariableSlider
              name="liveness"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.liveness}
              onChange={(e) =>
                recommendationParameterStore.setliveness(e.target.value)
              }
            />
            <VariableSlider
              name="loudness"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.loudness}
              onChange={(e) =>
                recommendationParameterStore.setLoudness(e.target.value)
              }
            />
            <VariableSlider
              name="mode"
              min="0"
              max="1"
              step="1"
              value={recommendationParameterStore.mode}
              onChange={(e) =>
                recommendationParameterStore.setMode(e.target.value)
              }
            />
            <VariableSlider
              name="popularity"
              min="0"
              max="100"
              step="1"
              value={recommendationParameterStore.popularity}
              onChange={(e) =>
                recommendationParameterStore.setPopularity(e.target.value)
              }
            />
            <VariableSlider
              name="speechiness"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.speechiness}
              onChange={(e) =>
                recommendationParameterStore.setSpeechiness(e.target.value)
              }
            />
            <VariableSlider
              name="tempo in beats per minute (BPM)"
              min="0"
              max="200"
              step="1"
              value={recommendationParameterStore.tempo}
              onChange={(e) =>
                recommendationParameterStore.setTempo(e.target.value)
              }
            />
            <VariableSlider
              name="time signature"
              min="3"
              max="7"
              step="1"
              value={recommendationParameterStore.timeSignature}
              onChange={(e) =>
                recommendationParameterStore.setTimeSignature(e.target.value)
              }
            />
            <VariableSlider
              name="valence"
              min="0"
              max="1"
              step="0.01"
              value={recommendationParameterStore.valence}
              onChange={(e) =>
                recommendationParameterStore.setValence(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
