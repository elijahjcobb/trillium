"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTrack } from "./track-client";

export function useHeartBeat(): void {
  const path = usePathname();
  const track = useTrack();
  useEffect(() => {
    const interval = setInterval(() => {
      track({ key: "heartbeat", meta: { path } });
    }, 1000);
    return () => clearInterval(interval);
  }, [path, track]);
}

export function Heartbeat(): null {
  useHeartBeat();
  return null;
}
