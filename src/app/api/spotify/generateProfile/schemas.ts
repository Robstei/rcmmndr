import { z } from "zod";

export type Track = z.infer<typeof Track>;
export const Track = z
  .object({
    track: z.object({
      id: z.string(),
      artists: z.array(
        z.object({
          id: z.string(),
          genres: z.array(z.string()).optional(),
        })
      ),
    }),
  })
  .transform((value) => value.track);

export type SavedTracks = z.infer<typeof SavedTracks>;
export const SavedTracks = z.object({
  items: z.array(Track),
  total: z.number(),
});

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

export type Artists = z.infer<typeof Artists>;
export const Artists = z.object({
  artists: z.array(
    z.object({ id: z.string(), genres: z.array(z.string()).optional() })
  ),
});
