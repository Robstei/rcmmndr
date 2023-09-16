import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prismaClient } from "@/prisma/prismaClient";
import { Session } from "next-auth";

export async function createLike(
  trackId: string,
  liked: boolean,
  session: Session
) {
  await prismaClient.likes.create({
    data: {
      trackId,
      liked,
      timeStamp: new Date(),
      user: { connect: { id: session.user.id } },
    },
  });
}

export async function addRecomendation(
  trackId: string,
  liked: boolean,
  session: Session
) {
  await prismaClient.likes.create({
    data: {
      trackId,
      liked,
      timeStamp: new Date(),
      user: { connect: { id: session.user.id } },
    },
  });
}
