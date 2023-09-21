import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  /*   const Schema = z.object({ songId: z.string(), liked: z.boolean() });
  const { liked, songId } = Schema.parse(await request.json());
  await createLike(songId, liked, session); */
  return new NextResponse();
}
