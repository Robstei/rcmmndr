import { prismaClient } from "@/prisma/prismaClient";

export async function GET() {
  try {
    await prismaClient.track.create({
      data: {
        id: "0JZ1ABjN8q7TNwMP39NjvU",
        artists: {
          connectOrCreate: [
            {
              where: { id: "1ZPGzmbFTn8GRjqTqnLiFE" },
              create: { id: "1ZPGzmbFTn8GRjqTqnLiFE" },
            },
            {
              where: { id: "6v2YWK8EvCyut0QtBcAypu" },
              create: { id: "6v2YWK8EvCyut0QtBcAypu" },
            },
            {
              where: { id: "61PUjJm9JH5ck3LxD6RypE" },
              create: { id: "61PUjJm9JH5ck3LxD6RypE" },
            },
          ],
        },
        trackFeatures: {
          create: {
            acousticness: 0.0299,
            danceability: 0.732,
            duration_ms: 163034,
            energy: 0.976,
            instrumentalness: 0.0000838,
            key: 5,
            liveness: 0.25,
            loudness: -5.305,
            mode: 1,
            speechiness: 0.045,
            tempo: 144.985,
            time_signature: 4,
            valence: 0.523,
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
}
