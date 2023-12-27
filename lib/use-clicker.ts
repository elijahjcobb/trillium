"use client";
import { useEffect } from "react";
import { throttle } from "lodash";
import type { ClickerEvent } from "./events";
import { useTrack } from "./track-client";
import { hash } from "@elijahjcobb/next-api/build/hash";

const CLICK_THROTTLE_MS = 100;
const HOVER_THROTTLE_MS = 1000;

function parseEvent(ev: MouseEvent): ClickerEvent | null {
  if (ev.target === null) return null;

  let className: string | null = null;

  if ("className" in ev.target && typeof ev.target.className === "string") {
    const [c] = ev.target.className.split("__");
    c.trim();
    if (c.length > 0) className = c;
  }

  let id: string | null = null;

  if ("id" in ev.target && typeof ev.target.id === "string") {
    if (ev.target.id.length > 0) id = ev.target.id;
  }

  let text: string | null = null;
  let html: string | null = null;

  if ("innerHTML" in ev.target && typeof ev.target.innerHTML === "string") {
    const h = ev.target.innerHTML;
    if (!h.includes("</")) text = h;
    else {
      html = h;
    }
  }
  return {
    path: window.location.pathname,
    className,
    id,
    text,
    html,
    type: ev.type === "click" ? "click" : "hover",
  };
}

export function useClicker({
  enableClick,
  enableMove,
}: {
  enableClick: boolean;
  enableMove: boolean;
}): void {
  const track = useTrack();

  useEffect(() => {
    let lastHash = "";
    const clickHandler = throttle((ev: MouseEvent) => {
      const event = parseEvent(ev);
      if (event === null) return;
      hash(JSON.stringify(event)).then((hash) => {
        if (hash === lastHash) return;
        lastHash = hash;
        track({
          key: "mouse",
          meta: { ...event, hash, x: ev.clientX, y: ev.clientY },
        });
      });
    }, CLICK_THROTTLE_MS);
    const hoverHandler = throttle((ev: MouseEvent) => {
      const event = parseEvent(ev);
      if (event === null) return;
      hash(JSON.stringify(event)).then((hash) => {
        if (hash === lastHash) return;
        lastHash = hash;
        track({
          key: "mouse",
          meta: { ...event, hash, x: ev.clientX, y: ev.clientY },
        });
      });
    }, HOVER_THROTTLE_MS);
    if (enableClick) document.addEventListener("click", clickHandler);
    if (enableMove) document.addEventListener("mousemove", hoverHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("mousemove", hoverHandler);
    };
  }, [enableClick, enableMove, track]);
}

export function Clicker(): null {
  useClicker({ enableClick: false, enableMove: false });
  return null;
}
