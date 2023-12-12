"use client";
import { track } from "@vercel/analytics/react";
import { useCallback } from "react";

const SCOPES = [
  "query-picker-mini",
  "query-picker-full",
  "nav",
  "nav-mobile",
  "callout",
  "button",
  "full-screen-image",
] as const;

export type Scope = (typeof SCOPES)[number];

export type TrackFunction = (
  key: string,
  value?: string | number | boolean
) => void;

export function useAnalytics(prefix: Scope) {
  return useCallback<TrackFunction>(
    (key: string, value?: string | number | boolean) => {
      track(prefix, { key, ...(value ? { value } : {}) });
    },
    [prefix]
  );
}
