import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prismaClient } from "@/prisma/prismaClient";
import { LikeBody } from "@/schemas/schemas";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const body = await request.json();
  let parsedBody;
  try {
    parsedBody = LikeBody.parse(body);
  } catch (e) {
    console.log("error parsing like body");
    throw e;
  }

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
  } = parsedBody.parameter.values;
  const { trackId, ...trackFeaturesWithoutTrackId } = parsedBody.trackFeatures;
  await prismaClient.like.create({
    data: {
      liked: parsedBody.like,
      timeStamp: parsedBody.timeStamp,
      recomendation: {
        create: {
          basedOnDefaultValues: parsedBody.basedOnDefaultVaues,
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
          user: { connect: { id: session.user.id } },
          track: {
            connectOrCreate: {
              where: { id: parsedBody.track.id },
              create: {
                id: parsedBody.track.id,
                name: parsedBody.track.name,
                artists: {
                  connectOrCreate: parsedBody.track.artists.map((artist) => ({
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
                    ...parsedBody.analysisData.track,
                    bars: { create: parsedBody.analysisData.bars },
                    beats: { create: parsedBody.analysisData.beats },
                    sections: { create: parsedBody.analysisData.sections },
                    segments: { create: parsedBody.analysisData.segments },
                    tatums: { create: parsedBody.analysisData.tatums },
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

  return NextResponse.json({ success: true });
}

function castToNumberOrUndefined(value: string | undefined) {
  if (value) {
    return Number(value);
  }
}
