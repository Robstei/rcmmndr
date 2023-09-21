import { RecommendationBody } from "@/schemas/schemas";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getSession } from "next-auth/react";
import { useRecommendationStore } from "./RecommendationStore";
import { z } from "zod";
import { Genre, Track, Artist, Recommendations } from "@/schemas/schemas";

/* interface RecommendationParameterState {
  getRecommendationBody: () => RecommendationBody;
  artistSeeds: Artist[];
  addArtistSeed: (newSeed: Artist) => void;
  removeArtistSeed: (removedSeed: Artist) => void;
  trackSeeds: Artist[];
  addTrackSeed: (newSeed: Artist) => void;
  removeTrackSeed: (removedSeed: Artist) => void;
  genreSeeds: Genre[];
  addGenreSeed: (newSeed: Genre) => void;
  removeGenreSeed: (removedSeed: Genre) => void;
  acousticness: string;
  setAcousticness: (newValue: string) => void;
  danceability: string;
  setDanceability: (newValue: string) => void;
  duration: string;
  setDuration: (newValue: string) => void;
  energy: string;
  setEnergy: (newValue: string) => void;
  instrumentalness: string;
  setInstrumentalness: (newValue: string) => void;
  key: string;
  setKey: (newValue: string) => void;
  liveness: string;
  setliveness: (newValue: string) => void;
  loudness: string;
  setLoudness: (newValue: string) => void;
  mode: string;
  setMode: (newValue: string) => void;
  popularity: string;
  setPopularity: (newValue: string) => void;
  speechiness: string;
  setSpeechiness: (newValue: string) => void;
  tempo: string;
  setTempo: (newValue: string) => void;
  timeSignature: string;
  setTimeSignature: (newValue: string) => void;
  valence: string;
  setValence: (newValue: string) => void;
} */

type RecommendationParameterState = z.infer<
  typeof RecommendationParameterState
>;
export const RecommendationParameterState = z.object({
  getRecommendationBody: z.function().returns(RecommendationBody),
  artistSeeds: z.array(Artist),
  addArtistSeed: z.function().args(Artist),
  removeArtistSeed: z.function().args(Artist),
  trackSeeds: z.array(Track),
  addTrackSeed: z.function().args(Track),
  removeTrackSeed: z.function().args(Track),
  genreSeeds: z.array(Genre),
  addGenreSeed: z.function().args(Genre),
  removeGenreSeed: z.function().args(Genre),
  acousticness: z.string(),
  setAcousticness: z.function().args(z.string()),
  danceability: z.string(),
  setDanceability: z.function().args(z.string()),
  duration: z.string(),
  setDuration: z.function().args(z.string()),
  energy: z.string(),
  setEnergy: z.function().args(z.string()),
  instrumentalness: z.string(),
  setInstrumentalness: z.function().args(z.string()),
  key: z.string(),
  setKey: z.function().args(z.string()),
  liveness: z.string(),
  setliveness: z.function().args(z.string()),
  loudness: z.string(),
  setLoudness: z.function().args(z.string()),
  mode: z.string(),
  setMode: z.function().args(z.string()),
  popularity: z.string(),
  setPopularity: z.function().args(z.string()),
  speechiness: z.string(),
  setSpeechiness: z.function().args(z.string()),
  tempo: z.string(),
  setTempo: z.function().args(z.string()),
  timeSignature: z.string(),
  setTimeSignature: z.function().args(z.string()),
  valence: z.string(),
  setValence: z.function().args(z.string()),
});

export const useRecommendationParameterStore = create(
  subscribeWithSelector<RecommendationParameterState>((set, get) => ({
    getRecommendationBody: () => ({
      seeds: {
        artistSeeds: get().artistSeeds,
        genreSeeds: get().genreSeeds,
        trackSeeds: get().trackSeeds,
      },
      values: {
        acousticness: get().acousticness,
        danceability: get().danceability,
        duration: get().duration,
        energy: get().energy,
        key: get().key,
        liveness: get().liveness,
        loudness: get().loudness,
        mode: get().mode,
        popularity: get().popularity,
        speechiness: get().speechiness,
        tempo: get().tempo,
        timeSignature: get().timeSignature,
        valence: get().valence,
        instrumentalness: get().instrumentalness,
      },
    }),
    artistSeeds: [],
    addArtistSeed: (newSeed) =>
      set((state) => ({
        artistSeeds: state.artistSeeds.concat(newSeed),
      })),
    removeArtistSeed: (removedSeed) =>
      set((state) => ({
        artistSeeds: state.artistSeeds.filter(
          (artistSeed) => artistSeed.id !== removedSeed.id
        ),
      })),

    trackSeeds: [],
    addTrackSeed: (newSeed) =>
      set((state) => ({
        trackSeeds: state.trackSeeds.concat(newSeed),
      })),
    removeTrackSeed: (removedSeed) =>
      set((state) => ({
        trackSeeds: state.trackSeeds.filter(
          (trackSeed) => trackSeed.id !== removedSeed.id
        ),
      })),

    genreSeeds: [],
    addGenreSeed: (newSeed) =>
      set((state) => ({
        genreSeeds: state.genreSeeds.concat(newSeed),
      })),
    removeGenreSeed: (removedSeed) =>
      set((state) => ({
        genreSeeds: state.genreSeeds.filter(
          (genreSeed) => genreSeed !== removedSeed
        ),
      })),
    acousticness: "",
    setAcousticness: (newValue) =>
      set(() => ({
        acousticness: newValue,
      })),
    danceability: "",
    setDanceability: (newValue) =>
      set(() => ({
        danceability: newValue,
      })),
    duration: "",
    setDuration: (newValue) =>
      set(() => ({
        duration: newValue,
      })),
    energy: "",
    setEnergy: (newValue) =>
      set(() => ({
        energy: newValue,
      })),
    instrumentalness: "",
    setInstrumentalness: (newValue) =>
      set(() => ({
        instrumentalness: newValue,
      })),
    key: "",
    setKey: (newValue) =>
      set(() => ({
        key: newValue,
      })),
    liveness: "",
    setliveness: (newValue) =>
      set(() => ({
        liveness: newValue,
      })),
    loudness: "",
    setLoudness: (newValue) =>
      set(() => ({
        loudness: newValue,
      })),
    mode: "",
    setMode: (newValue) =>
      set(() => ({
        mode: newValue,
      })),
    popularity: "",
    setPopularity: (newValue) =>
      set(() => ({
        popularity: newValue,
      })),
    speechiness: "",
    setSpeechiness: (newValue) =>
      set(() => ({
        speechiness: newValue,
      })),
    tempo: "",
    setTempo: (newValue) =>
      set(() => ({
        tempo: newValue,
      })),
    timeSignature: "",
    setTimeSignature: (newValue) =>
      set(() => ({
        timeSignature: newValue,
      })),
    valence: "",
    setValence: (newValue) =>
      set(() => ({
        valence: newValue,
      })),
    recommendations: null,
  }))
);

let timeOfLastRequest = new Date(0).getTime();
let timeOfLastChange = Date.now();
let currentTimeoutId: number;

useRecommendationParameterStore.subscribe(async () => {
  timeOfLastChange = Date.now();
  const difference = timeOfLastChange - timeOfLastRequest;

  if (difference > 1000) {
    clearTimeout(currentTimeoutId);
    timeOfLastRequest = Date.now();

    const session = await getSession();
    if (!session) throw new Error("no session");

    currentTimeoutId = window.setTimeout(async () => {
      if (timeOfLastChange > timeOfLastRequest) {
        await updateRecommendations(session.user.spotifyAccessToken);
        await playNextRecommendation(session.user.spotifyAccessToken);
      }
    }, 1000);
    await updateRecommendations(session.user.spotifyAccessToken);
    await playNextRecommendation(session.user.spotifyAccessToken);
  }
});

async function updateRecommendations(spotifyAccessToken: string) {
  const body = useRecommendationParameterStore
    .getState()
    .getRecommendationBody();

  const searchParams = new URLSearchParams();
  type key = keyof typeof body.values;
  let key: key;
  for (key in body.values) {
    if (body.values[key] !== "") {
      const value = body.values[key];
      searchParams.set(key, value || "");
    }
  }

  let url =
    "https://api.spotify.com/v1/recommendations?" + searchParams.toString();

  if (body.seeds.artistSeeds.length > 0) {
    url += `&seed_artists=${body.seeds.artistSeeds
      .map((seed) => seed.id)
      .join(",")}`;
  }

  if (body.seeds.trackSeeds.length > 0) {
    url += `&seed_tracks=${body.seeds.trackSeeds
      .map((seed) => seed.id)
      .join(",")}`;
  }
  if (body.seeds.genreSeeds.length > 0) {
    url += `&seed_genres=${body.seeds.genreSeeds.join(",")}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  });
  const recommendations = Recommendations.parse(await response.json());

  useRecommendationStore.setState(() => ({
    currentIndex: 0,
    recommendations: recommendations,
  }));
}

async function playNextRecommendation(spotifyAccessToken: string) {
  const { currentIndex, recommendations } = useRecommendationStore.getState();

  if (recommendations.length === currentIndex) {
    updateRecommendations(spotifyAccessToken);
  }
  const trackUri = recommendations[currentIndex + 1].uri;
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "Put",
    body: JSON.stringify({ uris: [trackUri] }),
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  });
}
