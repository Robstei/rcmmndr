import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import { prismaClient } from "@/prisma/prismaClient";

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error("env variable missing");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "streaming user-read-email user-read-private " +
            "user-read-currently-playing user-library-read " +
            "playlist-modify-public playlist-modify-private",
        },
      },
    }),
  ],
  pages: { newUser: "/generateProfile" },
  callbacks: {
    async session({ session, user, token }) {
      const result = await prismaClient.account.findFirst({
        select: { access_token: true, expires_at: true, refresh_token: true },
        where: { userId: user.id },
      });
      session.user.id = user.id;

      if (!result?.refresh_token) {
        return session;
      }

      const responseRaw = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "Post",
          body: new URLSearchParams({
            refresh_token: result.refresh_token,
            grant_type: "refresh_token",
          }),
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                  ":" +
                  process.env.SPOTIFY_CLIENT_SECRET
              ).toString("base64"),
          },
        }
      );
      const Schema = z.object({
        access_token: z.string(),
      });

      const response = Schema.parse(await responseRaw.json());

      await prismaClient.account.updateMany({
        where: { userId: user.id, provider: "spotify" },
        data: {
          access_token: response.access_token,
        },
      });

      session.user.spotifyAccessToken = response.access_token;
      session.user.spotifyAccessToken = result?.access_token || "";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
