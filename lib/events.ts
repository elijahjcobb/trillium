export const EVENTS = [
  "user.auth",
  "user.signup",
  "user.login",
  "favorites.list",
  "favorites.add",
  "favorites.remove",
  "heartbeat",
  "mouse",
] as const satisfies string[];

export type EventKey = (typeof EVENTS)[number];

export const ANONYMOUS_EVENTS = [
  "user.auth",
  "heartbeat",
  "mouse",
] as const satisfies EventKey[];

export type AnonymousEvent = (typeof ANONYMOUS_EVENTS)[number];

type EventMetaType = {
  [K in EventKey]: Record<string, string | number | boolean | null> | undefined;
};

export interface ClickerEvent {
  className: string | null;
  id: string | null;
  text: string | null;
  html: string | null;
  path: string;
  type: "click" | "hover";
  [key: string]: string | number | null;
}

export interface ClickerEventMeta extends ClickerEvent {
  hash: string;
  x: number;
  y: number;
}

export interface EventsMeta extends EventMetaType {
  "user.auth": undefined;
  "user.signup": undefined;
  "user.login": undefined;
  "favorites.list": undefined;
  "favorites.add": { mls: string };
  "favorites.remove": { mls: string };
  heartbeat: { path: string };
  mouse: ClickerEventMeta;
}

export type EventMeta<Event extends EventKey> = EventsMeta[Event];
