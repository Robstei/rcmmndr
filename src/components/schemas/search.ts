import { z } from "zod";

export type Artist = z.infer<typeof Artist>;
const Artist = z.object({ id: z.string(), name: z.string() });

export const ArtistSearch = z.object({
  artists: z.object({
    items: z.array(Artist),
  }),
});

export type Track = z.infer<typeof Track>;
const Track = z.object({
  id: z.string(),
  name: z.string(),
  album: z.object({ name: z.string() }),
  artists: z.array(z.object({ name: z.string() })),
});

export const TrackSearch = z.object({
  tracks: z.object({
    items: z.array(Track),
  }),
});

export type Genre = z.infer<typeof Genre>;
const Genre = z.string();

export const AvailableGenres = z.object({ genres: z.array(Genre) });
