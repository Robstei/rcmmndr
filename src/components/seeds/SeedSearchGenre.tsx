import { SeedSearch } from "./SeedSearch";
import { useRecommendationParameterStore } from "@/stores/RecommendationParamterStore";
import { Genre } from "@/schemas/schemas";
import { genres } from "@/lib/spotifyGenreSeedsBackup";

export function SeedGenre() {
  const { genreSeeds, addGenreSeed, removeGenreSeed } =
    useRecommendationParameterStore();
  const allGenres = genres;

  return (
    <SeedSearch<Genre>
      currentSeeds={genreSeeds}
      addSeed={(newSeed) => {
        addGenreSeed(newSeed);
      }}
      removeSeed={(removedSeed) => {
        removeGenreSeed(removedSeed);
      }}
      searchSeeds={(search) =>
        allGenres.filter((genre) => genre.includes(search))
      }
      renderSeed={(seed) => seed}
      renderId={(seed) => seed}
    />
  );
}
