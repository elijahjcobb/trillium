"use client";
import { Dispatch, ReactElement, SetStateAction, createContext, use, useCallback, useContext, useEffect, useState } from "react";
import { EventKey, EventMeta } from "./events";

const CACHE_LIMIT = 20;

type Tracks = { key: EventKey; meta?: EventMeta<EventKey> }[];
type TrackContext = {
  value: Tracks;
  setValue: Dispatch<SetStateAction<Tracks>>;
}

const context = createContext<TrackContext>({} as TrackContext);


const send = (events: Tracks) => {
  fetch("/api/events", {
    method: "POST",
    body: JSON.stringify(events),
  });
}

export function Track({ children }: { children: ReactElement }): JSX.Element {
  const [events, setEvents] = useState<Tracks>([]);

  useEffect(() => {
    if (events.length >= CACHE_LIMIT) {
      send(events);
      setEvents([]);
    }
  }, [events]);

  useEffect(() => {
    const handler = () => {
      send(events);
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [events]);

  return <context.Provider value={{
    value: events,
    setValue: setEvents,
  }}>{children}</context.Provider>;
}

export function useTrack() {
  const { setValue } = useContext(context);
  return useCallback(function foo<K extends EventKey>(props: {
    key: K;
  } & (EventMeta<K> extends undefined ? {} : { meta: EventMeta<K> })) {
    setValue((events) => [...events, props]);
  }, [setValue]);
}
