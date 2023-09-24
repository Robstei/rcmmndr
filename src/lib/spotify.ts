import {
  Recommendations,
  TrackAnalysis,
  TrackFeatures,
} from "@/schemas/schemas";
import { useAnalysisStore } from "@/stores/AnalysisStore";
import { useFeatureStore } from "@/stores/FeatureStore";
import { useRecommendationParameterStore } from "@/stores/RecommendationParamterStore";
import { useRecommendationStore } from "@/stores/RecommendationStore";

async function getFeatureAndAnalysisData(spotifyAccessToken: string) {
  const recommendationState = useRecommendationStore.getState();
  const track =
    recommendationState.recommendations[recommendationState.currentIndex];

  const analysisRequest = fetch(
    `https://api.spotify.com/v1/audio-analysis/${track.id}`,
    {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken} `,
      },
    }
  ).then((result) => result.json());

  const featureRequest = fetch(
    `https://api.spotify.com/v1/audio-features/${track.id}`,
    {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken} `,
      },
    }
  ).then((result) => result.json());
  // await
  const [analysisResult, featureResult] = await Promise.allSettled([
    analysisRequest,
    featureRequest,
  ]);

  if (analysisResult.status === "fulfilled") {
    useAnalysisStore.setState(TrackAnalysis.parse(analysisResult.value));
  }
  if (featureResult.status === "fulfilled") {
    useFeatureStore.setState(TrackFeatures.parse(featureResult.value));
  }
}

async function playNextRecommendation(spotifyAccessToken: string) {
  const { currentIndex, recommendations } = useRecommendationStore.getState();

  const analysisData = useAnalysisStore.getState();
  const start = analysisData.sections[2].start * 1000;

  const trackUri = recommendations[currentIndex].uri;
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "Put",
    body: JSON.stringify({ uris: [trackUri], position_ms: start }),
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  });
}

export async function updateRecommendations(spotifyAccessToken: string) {
  const body = useRecommendationParameterStore
    .getState()
    .getRecommendationBody();

  const searchParams = new URLSearchParams();
  type key = keyof typeof body.values;
  let key: key;
  for (key in body.values) {
    if (body.values[key] !== "") {
      const value = body.values[key];
      searchParams.set(key, value || "");
    }
  }

  let url =
    "https://api.spotify.com/v1/recommendations?limit=100&" +
    searchParams.toString();

  if (body.seeds.artistSeeds.length > 0) {
    url += `&seed_artists=${body.seeds.artistSeeds
      .map((seed) => seed.id)
      .join(",")}`;
  }

  if (body.seeds.trackSeeds.length > 0) {
    url += `&seed_tracks=${body.seeds.trackSeeds
      .map((seed) => seed.id)
      .join(",")}`;
  }
  if (body.seeds.genreSeeds.length > 0) {
    url += `&seed_genres=${body.seeds.genreSeeds.join(",")}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  });
  const recommendations = Recommendations.parse(await response.json());
  useRecommendationStore.setState(() => ({
    currentIndex: 0,
    recommendations: recommendations,
  }));
}

export async function analyseAndPlayNextRecommendation(
  spotifyAccessToken: string,
  forceUpdate = false
) {
  let { currentIndex, recommendations } = useRecommendationStore.getState();
  if (recommendations.length === currentIndex || forceUpdate) {
    await updateRecommendations(spotifyAccessToken);
    currentIndex = useRecommendationStore.getState().currentIndex;
    recommendations = useRecommendationStore.getState().recommendations;
  }

  await getFeatureAndAnalysisData(spotifyAccessToken);
  await playNextRecommendation(spotifyAccessToken);
}
