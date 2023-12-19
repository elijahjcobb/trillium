"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useHeartBeat(): void {
  const path = usePathname();

  const track = useCallback(() => {
    fetch("/api/heartbeat", {
      method: "POST",
      body: JSON.stringify({ href: path }),
    }).catch(console.error);
  }, [path]);

  useEffect(() => {
    const interval = setInterval(track, 1000);
    return () => clearInterval(interval);
  }, [path, track]);
}

export function Heartbeat(): null {
  useHeartBeat();
  return null;
}
