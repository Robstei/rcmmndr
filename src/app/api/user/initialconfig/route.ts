import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AvailableGenres, RecommendationBody } from "@/schemas/schemas";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const userId = session.user.id;

  const trackIdsObjects = await prismaClient.track.findMany({
    where: { users: { some: { id: userId } } },
  });

  const trackIds = trackIdsObjects.map((trackIdsObject) => trackIdsObject.id);
  const averages = await prismaClient.trackFeatures.aggregate({
    _avg: {
      acousticness: true,
      danceability: true,
      duration_ms: true,
      energy: true,
      instrumentalness: true,
      key: true,
      liveness: true,
      loudness: true,
      mode: true,
      speechiness: true,
      tempo: true,
      time_signature: true,
      valence: true,
    },
    where: { trackId: { in: trackIds } },
  });

  const parsedAverages = {
    acousticness: averages._avg.acousticness
      ? averages._avg.acousticness.toFixed(2)
      : "",
    danceability: averages._avg.danceability
      ? averages._avg.danceability.toFixed(2)
      : "",
    // duration should be in ms everywhere except ui. This ensures a flat value on first load
    duration: averages._avg.duration_ms
      ? String(+(averages._avg.duration_ms / 1000).toFixed() * 1000)
      : "",
    energy: averages._avg.energy
      ? averages._avg.energy.toFixed(2).toString()
      : "",
    instrumentalness: averages._avg.instrumentalness
      ? averages._avg.instrumentalness.toFixed(2)
      : "",
    key: averages._avg.key ? averages._avg.key.toFixed(1) : "",
    liveness: averages._avg.liveness ? averages._avg.liveness.toFixed(2) : "",
    loudness: averages._avg.loudness ? averages._avg.loudness.toFixed(2) : "",
    mode: averages._avg.mode ? averages._avg.mode.toFixed() : "",
    speechiness: averages._avg.speechiness
      ? averages._avg.speechiness.toFixed(2)
      : "",
    tempo: averages._avg.tempo ? averages._avg.tempo.toFixed() : "",
    timeSignature: averages._avg.time_signature
      ? averages._avg.time_signature.toFixed(0)
      : "",
    valence: averages._avg.valence ? averages._avg.valence.toFixed(2) : "",
  };

  const results = await prismaClient.artist.findMany({
    select: {
      id: true,
      genres: true,
      track: { select: { users: { select: { id: true } } } },
    },
    where: { track: { some: { users: { some: { id: userId } } } } },
  });

  const genreCountMap = new Map<string, number>();
  for (const result of results) {
    for (const genre of result.genres) {
      const value = genreCountMap.get(genre);
      if (value) {
        genreCountMap.set(genre, value + 1);
      } else {
        genreCountMap.set(genre, 1);
      }
    }
  }

  const possibleGenreSeedsRaw = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      headers: {
        Authorization: `Bearer ${session.user.spotifyAccessToken}`,
      },
    }
  );

  const possibleGenreSeeds = AvailableGenres.parse(
    await possibleGenreSeedsRaw.json()
  ).genres;

  const highest = Array.from(genreCountMap.entries())
    .filter((value) => possibleGenreSeeds.includes(value[0]))
    .reduce((prev, current) => {
      if (current[1] > prev[1]) {
        return current;
      }
      return prev;
    });

  const repoonseBody: RecommendationBody = {
    seeds: {
      artistSeeds: [],
      genreSeeds: [highest[0]],
      trackSeeds: [],
    },
    values: parsedAverages,
  };

  return NextResponse.json(repoonseBody);
}
