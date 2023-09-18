import { RecommendationBody } from "@/app/api/spotify/recommendation/route";
import { useRecommendationStore } from "@/stores/RecommendationStore";

export function LikeButton({
  like,
  trackId,
  className,
}: {
  like: boolean;
  trackId: string;
  className: string;
}) {
  const recommendationBody = useRecommendationStore().getRecommendationBody();
  async function handleClick(like: boolean) {
    await fetch("api/spotify/recommendation", {
      method: "post",
      body: JSON.stringify(recommendationBody),
    });
  }

  return (
    <button
      className={className}
      onClick={() => {
        handleClick(like);
      }}
    >
      {like ? (
        <svg
          className="fill-lime-500 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M480-260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
        </svg>
      ) : (
        <svg
          className="fill-red-600 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M480-420q-68 0-123.5 38.5T276-280h408q-25-63-80.5-101.5T480-420Zm-168-60 44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
        </svg>
      )}
    </button>
  );
}
