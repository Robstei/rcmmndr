import { prismaClient } from "@/prisma/prismaClient";
import { Session } from "next-auth";

export async function createLike(
  trackId: string,
  liked: boolean,
  session: Session
) {
  await prismaClient.like.create({
    data: {
      trackId,
      liked,
      timeStamp: new Date(),
      userId: session.user.id,
      recomendationId: "",
    },
  });
}

export async function addRecomendation(
  trackId: string,
  liked: boolean,
  session: Session
) {}
