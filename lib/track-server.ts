import { User } from "@prisma/client";
import { prisma } from "./prisma";
import { AnonymousEvent, EventKey, EventMeta } from "./events";

export async function trackServer<K extends EventKey>(
  props: {
    key: K;
  } & ((EventMeta<K> extends undefined ? {} : { meta: EventMeta<K> }) &
    (K extends AnonymousEvent
      ? { user?: User | string }
      : { user: User | string }))
) {
  await prisma.event.create({
    data: {
      userId:
        "user" in props
          ? typeof props.user === "string"
            ? props.user
            : props.user?.id
          : undefined,
      key: props.key,
      meta: "meta" in props ? (props.meta as unknown as string) : undefined,
    },
  });
}
