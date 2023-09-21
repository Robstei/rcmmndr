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
