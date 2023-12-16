"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackClient } from "./track-client";

export function useHeartBeat(): void {
  const path = usePathname();
  useEffect(() => {
    const interval = setInterval(() => {
      trackClient({ key: "heartbeat", meta: { path } });
    }, 1000);
    return () => clearInterval(interval);
  }, [path]);
}

export function Heartbeat(): null {
  useHeartBeat();
  return null;
}
