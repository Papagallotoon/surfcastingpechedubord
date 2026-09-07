"use client";

import { useEffect } from "react";
import { track, type TrackEvent, type TrackProps } from "@/lib/analytics";

interface TrackOnMountProps {
  event: TrackEvent;
  props?: TrackProps;
}

/** Fires a single analytics event on mount. Renders nothing. */
export function TrackOnMount({ event, props }: TrackOnMountProps) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
