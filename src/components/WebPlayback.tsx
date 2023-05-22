import React, { useState, useEffect } from "react";
import Script from "next/script";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [device_id, setDeviceId] = useState(null)

  useEffect(() => {
    {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(props.token);
          },
          volume: 0.5,
        });

        setPlayer(player);

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id)
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
    }
  }, [props.token]);

  function takeControl() {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: { Authorization: `Bearer ${props.token} `, "Content-Type": "application/json" },
      body: JSON.stringify({ "device_ids": [device_id] })
    });
  }

  async function setTime() {
    const trackData = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers: { Authorization: `Bearer ${props.token} ` } })
    const trackJson = await trackData.json()
    const trackId = trackJson.item.id
    const trackAudioData = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers: { Authorization: `Bearer ${props.token} ` } })
    const trackAudioDataJson = await trackAudioData.json()
    const sections = trackAudioDataJson.sections
    player.seek(sections[2].start * 1000)
  }

  async function getRecomendations(){
    const trackData = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers: { Authorization: `Bearer ${props.token} ` } })
    const trackJson = await trackData.json()
    const trackId = trackJson.item.id
    const recommendationsRaw = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`, { headers: { Authorization: `Bearer ${props.token} ` } })
    const recommendations = await recommendationsRaw.json()
    console.log(recommendations)
  }

  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" />

      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
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
          player.previousTrack();
        }}
      >
        &lt;&lt;
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.togglePlay();
        }}
      >
        {is_paused ? "PLAY" : "PAUSE"}
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.nextTrack();
        }}
      >
        &gt;&gt;
      </button>
      <button onClick={takeControl}>take Control</button>
      <button onClick={setTime}>Set to Interesting Time</button>
      <button onClick={getRecomendations}>Get Recomendations</button>

    </>
  );
}

export default WebPlayback;
