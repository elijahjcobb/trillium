"use client";
import { useEffect } from "react";
import { throttle } from "lodash";
import { hash } from "./hash";
import type { ClickerEvent, ClickerEventMeta } from "./events";
import { trackClient } from "./track-client";

const THROTTLE_MS = 100;

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

function handleClick(event: ClickerEventMeta): void {
  trackClient({ key: "mouse", meta: event });
}

export function useClicker(): void {
  useEffect(() => {
    let lastHash = "";
    const handler = throttle((ev: MouseEvent) => {
      const event = parseEvent(ev);
      if (event === null) return;
      hash(JSON.stringify(event)).then((hash) => {
        if (hash === lastHash) return;
        lastHash = hash;
        handleClick({ ...event, hash, x: ev.clientX, y: ev.clientY });
      });
    }, THROTTLE_MS);
    document.addEventListener("click", handler);
    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("mousemove", handler);
    };
  }, []);
}

export function Clicker(): null {
  useClicker();
  return null;
}
