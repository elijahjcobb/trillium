export const REVALIDATE_DEFAULT = 3600;

export async function fetcher<T>({
  url,
  path,
  method = "GET",
  body,
  revalidate,
  tags,
}: {
  url?: string;
  path?: string;
  method?: "GET" | "POST";
  body?: object;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  let realUrl = url;
  if (path) {
    realUrl = `/api${path}`;
  }
  if (!realUrl) throw new Error("No path or url provided.");
  realUrl = realUrl.replaceAll("%2B", "+");
  const res = await fetch(realUrl, {
    method,
    body: body ? JSON.stringify(body) : null,
    next: {
      revalidate,
      tags,
    },
  });
  if (!res.ok)
    throw new Error(
      `Fetch request responded with status code '${res.status}' - (${res.statusText}).`
    );
  const json = (await res.json()) as T;
  return json;
}
