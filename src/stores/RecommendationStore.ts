import { Track } from "@/schemas/schemas";
import { create } from "zustand";

type RecommendationState = {
  currentIndex: number;
  setCurrentIndex: (newValue: number) => void;
  recommendations: Track[];
  setRecommendations: (newValue: Track[]) => void;
};

export const useRecommendationStore = create<RecommendationState>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (newValue) => set(() => ({ currentIndex: newValue })),
  recommendations: [],
  setRecommendations: (newValue) => set(() => ({ recommendations: newValue })),
}));
