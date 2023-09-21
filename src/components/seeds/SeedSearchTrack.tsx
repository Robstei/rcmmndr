import { SeedSearch } from "./SeedSearch";
import { Track, TrackSearch } from "@/schemas/schemas";
import { useRecommendationParameterStore } from "@/stores/RecommendationParamterStore";
import { useSession } from "next-auth/react";

export function SeedSearchTrack() {
  const { trackSeeds, addTrackSeed, removeTrackSeed } =
    useRecommendationParameterStore();
  const session = useSession();

  return (
    <SeedSearch<Track>
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
