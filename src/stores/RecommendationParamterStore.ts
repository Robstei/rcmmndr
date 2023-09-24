import { RecommendationBody } from "@/schemas/schemas";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getSession } from "next-auth/react";
import { z } from "zod";
import { Genre, Track, Artist } from "@/schemas/schemas";
import { analyseAndPlayNextRecommendation } from "@/lib/spotify";
import { useRecommendationStore } from "./RecommendationStore";

type RecommendationParameterState = z.infer<
  typeof RecommendationParameterState
>;
export const RecommendationParameterState = z.object({
  getRecommendationBody: z.function().returns(RecommendationBody),
  basedOnDefaultParameter: z.boolean(),
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
    basedOnDefaultParameter: false,
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
  useRecommendationStore.setState({ basedOnDefaultParameter: false });
  timeOfLastChange = Date.now();
  const difference = timeOfLastChange - timeOfLastRequest;

  if (difference > 1000) {
    clearTimeout(currentTimeoutId);
    timeOfLastRequest = Date.now();

    const session = await getSession();
    if (!session) throw new Error("no session");

    analyseAndPlayNextRecommendation(session.user.spotifyAccessToken, true);

    currentTimeoutId = window.setTimeout(async () => {
      if (timeOfLastChange > timeOfLastRequest) {
        analyseAndPlayNextRecommendation(session.user.spotifyAccessToken, true);
      }
    }, 1000);
  }
});
