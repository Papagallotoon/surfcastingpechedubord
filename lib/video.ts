export interface VideoEmbed {
  kind: "iframe" | "file";
  src: string;
}

/**
 * Turns a product.videoUrl into something renderable: a YouTube/Vimeo embed
 * URL for an iframe, or the URL as-is for a direct video file. Returns null
 * for anything we can't confidently handle — callers should skip rendering
 * rather than guess.
 */
export function resolveVideoEmbed(url: string): VideoEmbed | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
      return null;
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
      return null;
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
      return null;
    }

    // Wistia embed URLs (e.g. a vendor's own product/demo video, commonly
    // shared with affiliates) are already in ready-to-embed iframe form.
    if (host === "fast.wistia.net" || host === "wistia.com" || host.endsWith(".wistia.com")) {
      return { kind: "iframe", src: url };
    }

    if (/\.(mp4|webm|mov)$/i.test(parsed.pathname)) {
      return { kind: "file", src: url };
    }

    return null;
  } catch {
    return null;
  }
}
