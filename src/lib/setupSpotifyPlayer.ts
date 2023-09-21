import { WebPlaybackTrack } from "@/schemas/schemas";
import { RecommendationBody } from "@/schemas/schemas";
import { useRecommendationParameterStore } from "@/stores/RecommendationParamterStore";
import { Dispatch, SetStateAction } from "react";

WebPlaybackTrack;

export function setupSpotifyPlayer(
  spotifyAccessToken: string,
  setPlayer: Dispatch<SetStateAction<Spotify.Player | undefined>>,
  setActive: Dispatch<SetStateAction<boolean>>,
  setCurrentTrack: Dispatch<SetStateAction<WebPlaybackTrack | undefined>>,
  setPaused: Dispatch<SetStateAction<boolean>>
) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        if (spotifyAccessToken) cb(spotifyAccessToken);
      },
      volume: 0.1,
    });

    setPlayer(player);

    // Ready
    player.addListener("ready", async ({ device_id }) => {
      console.log("Ready with Device ID", device_id);

      await takeControl(spotifyAccessToken, device_id);
      await setInitialConfig();
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
      console.log("hier", state);
      if (!state) {
        return;
      }
      setCurrentTrack(WebPlaybackTrack.parse(state.track_window.current_track));
      setPaused(state.paused);

      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });

    player.connect();
  };
}

async function takeControl(spotifyAccessToken: string, device_id: string) {
  await fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${spotifyAccessToken} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ device_ids: [device_id] }),
  });
}

async function setInitialConfig() {
  const result = await fetch("/api/user/initialconfig");
  const initialConfig = RecommendationBody.parse(await result.json());
  useRecommendationParameterStore.setState({
    ...initialConfig.seeds,
    ...initialConfig.values,
  });
}
