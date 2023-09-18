import { SeedSearch } from "./SeedSearch";
import { Artist } from "../schemas/search";
import { useRecommendationStore } from "@/stores/RecommendationStore";
import { ArtistSearch } from "../schemas/search";
import { useSession } from "next-auth/react";

export function SeedSearchArtist() {
  const { artistSeeds, addArtistSeed, removeArtistSeed } =
    useRecommendationStore();
  const session = useSession();

  return (
    <SeedSearch<Artist>
      currentSeeds={artistSeeds}
      addSeed={(newSeed) => {
        addArtistSeed(newSeed);
      }}
      removeSeed={(removedSeed) => {
        removeArtistSeed(removedSeed);
      }}
      searchSeeds={async (search) => {
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${search}&type=artist&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${session.data?.user.spotifyAccessToken}`,
            },
          }
        );
        return ArtistSearch.parse(await result.json()).artists.items;
      }}
      renderSeed={(seed) => seed.name}
      renderId={(seed) => seed.id}
    />
  );
}
