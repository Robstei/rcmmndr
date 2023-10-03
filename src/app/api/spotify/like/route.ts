import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaClient } from "@/prisma/prismaClient";
import { LikeBody } from "@/schemas/schemas";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(null, { status: 403 });
    }

    const parsedBody = LikeBody.parse(await request.json());

    const databasePromise = saveLikeToDatabase(parsedBody, session.user.id);

    let playlistPromise = Promise.resolve();
    if (parsedBody.saveToPlaylist) {
      playlistPromise = saveLikedSongToPlaylist(parsedBody.track.uri, session);
    }
    await Promise.allSettled([playlistPromise, databasePromise]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return new NextResponse(null, { status: 500 });
  }
}

async function saveLikedSongToPlaylist(songUri: string, session: Session) {
  const playlistIdResult = await prismaClient.playlist.findUnique({
    where: { userId: session.user.id },
  });

  let playlistId: string;

  if (playlistIdResult) {
    playlistId = playlistIdResult.spotifyPlaylistId;
  } else {
    const playlistSchema = z.object({ id: z.string() });
    const result = await prismaClient.account.findFirst({
      where: { userId: session.user.id, provider: "spotify" },
    });
    if (!result) {
      throw new Error("can't create new playlist");
    }

    const playlistResult = await fetch(
      `https://api.spotify.com/v1/users/${result.providerAccountId}/playlists`,
      {
        method: "POST",
        body: JSON.stringify({
          name: "rcmmndr",
          description: "Liked Songs from rcmmdr app",
          public: false,
        }),
        headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
      }
    ).then((result) => result.json());
    const parsedPlaylistResult = playlistSchema.parse(playlistResult);
    playlistId = parsedPlaylistResult.id;

    await prismaClient.playlist.create({
      data: { spotifyPlaylistId: playlistId, userId: session.user.id },
    });
  }

  await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    body: JSON.stringify({ uris: [songUri] }),
    headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
  });
}

async function saveLikeToDatabase(likeBody: LikeBody, userId: string) {
  const {
    acousticness,
    danceability,
    duration,
    energy,
    instrumentalness,
    key,
    liveness,
    loudness,
    mode,
    popularity,
    speechiness,
    tempo,
    timeSignature,
    valence,
  } = likeBody.parameter.values;
  const {
    trackId, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...trackFeaturesWithoutTrackId
  } = likeBody.trackFeatures;
  await prismaClient.like.create({
    data: {
      liked: likeBody.like,
      timeStamp: likeBody.timeStamp,
      recomendation: {
        create: {
          basedOnDefaultValues: likeBody.basedOnDefaultVaues,
          targetAcousticness: castToNumberOrUndefined(acousticness),
          targetDanceability: castToNumberOrUndefined(danceability),
          targetDuration_ms: castToNumberOrUndefined(duration),
          targetEnergy: castToNumberOrUndefined(energy),
          targetEnstrumentalness: castToNumberOrUndefined(instrumentalness),
          targetKey: castToNumberOrUndefined(key),
          targetLiveness: castToNumberOrUndefined(liveness),
          targetLoudness: castToNumberOrUndefined(loudness),
          targetPopularity: castToNumberOrUndefined(popularity),
          targetMode: castToNumberOrUndefined(mode),
          targetSpeechiness: castToNumberOrUndefined(speechiness),
          targetTime_signature: castToNumberOrUndefined(timeSignature),
          targetTempo: castToNumberOrUndefined(tempo),
          targetValence: castToNumberOrUndefined(valence),
          user: { connect: { id: userId } },
          track: {
            connectOrCreate: {
              where: { id: likeBody.track.id },
              create: {
                id: likeBody.track.id,
                name: likeBody.track.name,
                artists: {
                  connectOrCreate: likeBody.track.artists.map((artist) => ({
                    create: {
                      id: artist.id,
                      name: artist.name,
                      genres: artist.genres,
                    },
                    where: { id: artist.id },
                  })),
                },
                trackAnalysis: {
                  create: {
                    ...likeBody.analysisData.track,
                    bars: { create: likeBody.analysisData.bars },
                    beats: { create: likeBody.analysisData.beats },
                    sections: { create: likeBody.analysisData.sections },
                    segments: { create: likeBody.analysisData.segments },
                    tatums: { create: likeBody.analysisData.tatums },
                  },
                },
                trackFeatures: { create: trackFeaturesWithoutTrackId },
              },
            },
          },
        },
      },
    },
  });
}

function castToNumberOrUndefined(value: string | undefined) {
  if (value) {
    return Number(value);
  }
}
