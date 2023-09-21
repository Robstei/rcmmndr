import { TrackAnalysis } from "@/schemas/schemas";
import { create } from "zustand";

const useAnalysisStore = create<TrackAnalysis>(() => ({
  bars: [],
  beats: [],
  sections: [],
  segments: [],
  tatums: [],
  track: {
    analysis_channels: -1,
    analysis_sample_rate: -1,
    code_version: -1,
    codestring: "",
    duration: -1,
    echoprint_version: -1,
    echoprintstring: "",
    end_of_fade_in: -1,
    key: -1,
    key_confidence: -1,
    loudness: -1,
    mode: -1,
    mode_confidence: -1,
    num_samples: -1,
    offset_seconds: -1,
    rhythm_version: -1,
    rhythmstring: "",
    sample_md5: "",
    start_of_fade_out: -1,
    synch_version: -1,
    synchstring: "",
    tempo: -1,
    tempo_confidence: -1,
    time_signature: -1,
    time_signature_confidence: -1,
    window_seconds: -1,
  },
}));

export function setData(data: TrackAnalysis) {
  useAnalysisStore.setState(data);
}
