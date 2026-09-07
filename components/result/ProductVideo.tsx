import { resolveVideoEmbed } from "@/lib/video";

interface ProductVideoProps {
  videoUrl: string;
  productName: string;
}

/**
 * Full page-width video block — deliberately not squeezed into a card next
 * to other content. A real product/demo video carries more weight and
 * reads as more professional when it's given real screen space.
 */
export function ProductVideo({ videoUrl, productName }: ProductVideoProps) {
  const video = resolveVideoEmbed(videoUrl);
  if (!video) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      {video.kind === "iframe" ? (
        <iframe
          src={video.src}
          title={`${productName} video`}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={video.src} controls className="h-full w-full" preload="metadata" />
      )}
    </div>
  );
}
