import { z } from "zod";

export type TrackFeatures = z.infer<typeof TrackFeatures>;
export const TrackFeatures = z
  .object({
    audio_features: z.array(
      z
        .object({
          acousticness: z.number(),
          danceability: z.number(),
          duration_ms: z.number(),
          energy: z.number(),
          id: z.string(),
          instrumentalness: z.number(),
          key: z.number(),
          liveness: z.number(),
          loudness: z.number(),
          mode: z.number(),
          speechiness: z.number(),
          tempo: z.number(),
          time_signature: z.number(),
          valence: z.number(),
        })
        .transform(({ id, ...rest }) => {
          return { trackId: id, ...rest };
        })
    ),
  })
  .transform((value) => value.audio_features);

export type TrackAnalysis = z.infer<typeof TrackAnalysis>;
export const TrackAnalysis = z.object({
  track: z.object({
    num_samples: z.number(),
    duration: z.number(),
    sample_md5: z.string(),
    offset_seconds: z.number(),
    window_seconds: z.number(),
    analysis_sample_rate: z.number(),
    analysis_channels: z.number(),
    end_of_fade_in: z.number(),
    start_of_fade_out: z.number(),
    loudness: z.number(),
    tempo: z.number(),
    tempo_confidence: z.number(),
    time_signature: z.number(),
    time_signature_confidence: z.number(),
    key: z.number(),
    key_confidence: z.number(),
    mode: z.number(),
    mode_confidence: z.number(),
    codestring: z.string(),
    code_version: z.number(),
    echoprintstring: z.string(),
    echoprint_version: z.number(),
    synchstring: z.string(),
    synch_version: z.number(),
    rhythmstring: z.string(),
    rhythm_version: z.number(),
  }),
  bars: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      confidence: z.number(),
    })
  ),
  beats: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      confidence: z.number(),
    })
  ),

  sections: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      confidence: z.number(),
      loudness: z.number(),
      tempo: z.number(),
      tempo_confidence: z.number(),
      key: z.number(),
      key_confidence: z.number(),
      mode: z.number(),
      mode_confidence: z.number(),
      time_signature: z.number(),
      time_signature_confidence: z.number(),
    })
  ),
  segments: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      confidence: z.number(),
      loudness_start: z.number(),
      loudness_max: z.number(),
      loudness_max_time: z.number(),
      loudness_end: z.number(),
      pitches: z.array(z.number()),
      timbre: z.array(z.number()),
    })
  ),
  tatums: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      confidence: z.number(),
    })
  ),
});

export type Genre = z.infer<typeof Genre>;
export const Genre = z.string();

export type Artist = z.infer<typeof Artist>;
export const Artist = z.object({
  id: z.string(),
  name: z.string(),
  genres: z.array(Genre).optional(),
});

export type Artists = z.infer<typeof Artists>;
export const Artists = z.object({
  artists: z.array(Artist),
});

export const ArtistSearch = z.object({
  artists: z.object({
    items: z.array(Artist),
  }),
});

export type Track = z.infer<typeof Track>;
export const Track = z.object({
  id: z.string(),
  name: z.string(),
  album: z.object({ name: z.string() }),

  artists: z.array(Artist),
  uri: z.string(),
});

export const TrackSearch = z.object({
  tracks: z.object({
    items: z.array(Track),
  }),
});

export const AvailableGenres = z.object({ genres: z.array(Genre) });

export const Recommendations = z
  .object({ tracks: z.array(Track) })
  .transform((vaule) => vaule.tracks);

export type SavedTrack = z.infer<typeof SavedTrack>;
export const SavedTrack = z
  .object({ track: Track })
  .transform((value) => value.track);
export type SavedTracks = z.infer<typeof SavedTracks>;
export const SavedTracks = z.object({
  items: z.array(SavedTrack),
  total: z.number(),
});

export type RecommendationBody = z.infer<typeof RecommendationBody>;

export const RecommendationBody = z.object({
  seeds: z.object({
    artistSeeds: z.array(Artist),
    trackSeeds: z.array(Track),
    genreSeeds: z.array(Genre),
  }),
  values: z.object({
    acousticness: z.string(),
    danceability: z.string(),
    duration: z.string(),
    energy: z.string(),
    key: z.string(),
    liveness: z.string(),
    loudness: z.string(),
    mode: z.string(),
    popularity: z.string().optional(),
    speechiness: z.string(),
    tempo: z.string(),
    timeSignature: z.string(),
    valence: z.string(),
    instrumentalness: z.string(),
  }),
});

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
