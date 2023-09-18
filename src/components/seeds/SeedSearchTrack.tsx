import { SeedSearch } from "./SeedSearch";
import { Artist, TrackSearch } from "../schemas/search";
import { useRecommendationStore } from "@/stores/RecommendationStore";
import { useSession } from "next-auth/react";

export function SeedSearchTrack() {
  const { trackSeeds, addTrackSeed, removeTrackSeed } =
    useRecommendationStore();
  const session = useSession();

  return (
    <SeedSearch<Artist>
      currentSeeds={trackSeeds}
      addSeed={(newSeed) => {
        addTrackSeed(newSeed);
      }}
      removeSeed={(removedSeed) => {
        removeTrackSeed(removedSeed);
      }}
      searchSeeds={async (search) => {
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${search}&type=track&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${session.data?.user.spotifyAccessToken}`,
            },
          }
        );

        return TrackSearch.parse(await result.json()).tracks.items;
      }}
      renderSeed={(seed) => seed.name}
      renderId={(seed) => seed.id}
    />
  );
}
