import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const body = RecommendationBody.parse(await request.json());
  const searchParams = new URLSearchParams({
    target_acousticness: body.acousticness,
  });

  let url =
    "https://api.spotify.com/v1/recommendations?" + searchParams.toString();

  if (body.artistSeeds.length > 0) {
    url += `&seed_artists=${body.artistSeeds.join(",")}`;
  }

  if (body.trackSeeds.length > 0) {
    url += `&seed_tracks=${body.trackSeeds.join(",")}`;
  }
  if (body.genreSeeds.length > 0) {
    url += `&seed_genres=${body.genreSeeds.join(",")}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.spotifyAccessToken}`,
    },
  });

  console.log(url);
  console.log(await response.json());
  /*   const Schema = z.object({ songId: z.string(), liked: z.boolean() });
  const { liked, songId } = Schema.parse(await request.json());
  await createLike(songId, liked, session); */
  return new NextResponse();
}

export type RecommendationBody = z.infer<typeof RecommendationBody>;

export const RecommendationBody = z.object({
  artistSeeds: z.array(z.string()),
  trackSeeds: z.array(z.string()),
  genreSeeds: z.array(z.string()),
  acousticness: z.string(),
});
