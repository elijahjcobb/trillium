import { EventKey, EventMeta } from "./events";

export function trackClient<K extends EventKey>(
  props: {
    key: K;
  } & (EventMeta<K> extends undefined ? {} : { meta: EventMeta<K> })
) {
  console.log("trackClient", props);
  fetch("/api/event", {
    method: "POST",
    body: JSON.stringify({
      key: props.key,
      meta: "meta" in props ? props.meta : undefined,
    }),
  });
}
