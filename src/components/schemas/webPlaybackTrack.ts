import { z } from "zod";

export type WebPlaybackTrack = z.infer<typeof WebPlaybackTrack>;
export const WebPlaybackTrack = z.object({
  uri: z.string(), // Spotify URI
  id: z.string(), // Spotify ID from URI (can be null)
  type: z.string(), // Content type: can be "track", "episode" or "ad"
  media_type: z.string(), // Type of file: can be "audio" or "video"
  name: z.string(), // Name of content
  is_playable: z.boolean(), // Flag indicating whether it can be played
  album: z.object({
    uri: z.string(), // Spotify Album URI
    name: z.string(),
    images: z.array(z.object({ url: z.string() })),
  }),
  artists: z.array(z.object({ uri: z.string(), name: z.string() })),
});
