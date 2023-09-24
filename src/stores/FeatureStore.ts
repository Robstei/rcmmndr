import { create } from "zustand";

export interface TrackFeatureState {
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  trackId: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
}

export const useFeatureStore = create<TrackFeatureState>(() => ({
  acousticness: -1,
  danceability: -1,
  duration_ms: -1,
  energy: -1,
  trackId: "",
  instrumentalness: -1,
  key: -1,
  liveness: -1,
  loudness: -1,
  mode: -1,
  speechiness: -1,
  tempo: -1,
  time_signature: -1,
  valence: -1,
}));
