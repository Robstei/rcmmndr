import { SeedSearch } from "./SeedSearch";
import { AvailableGenres } from "../schemas/search";
import { useRecommendationStore } from "@/stores/RecommendationStore";
import { ArtistSearch } from "../schemas/search";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Genre } from "../schemas/search";

export function SeedGenre() {
  const { genreSeeds, addGenreSeed, removeGenreSeed } =
    useRecommendationStore();
  const session = useSession();
  const [allGenres, setAllGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAllGenres() {
      const results = await fetch(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.spotifyAccessToken}`,
          },
        }
      );
      setAllGenres(AvailableGenres.parse(await results.json()).genres);
    }
    fetchAllGenres();
  }, [session.data?.user.spotifyAccessToken]);
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
