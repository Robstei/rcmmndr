import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";
import { createLike } from "../functions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const Schema = z.object({ songId: z.string(), liked: z.boolean() });
  const { liked, songId } = Schema.parse(await request.json());
  await createLike(songId, liked, session);
  return new NextResponse();
}
