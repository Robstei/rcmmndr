import { RecommendationBody } from "@/app/api/spotify/recommendation/route";
import { Artist, Genre } from "@/components/schemas/search";
import { create } from "zustand";

interface RecommendationState {
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
}

export const useRecommendationStore = create<RecommendationState>(
  (set, get) => ({
    getRecommendationBody: () => ({
      acousticness: get().acousticness,
      artistSeeds: get().artistSeeds.map((artistSeed) => artistSeed.id),
      genreSeeds: get().genreSeeds,
      trackSeeds: get().trackSeeds.map((trackSeed) => trackSeed.id),
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
        trackSeeds: state.artistSeeds.filter(
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
    acousticness: "0.5",
    setAcousticness: (newValue) =>
      set(() => ({
        acousticness: newValue,
      })),
  })
);

useRecommendationStore.setState((state) => ({
  acousticness: state.acousticness,
}));
