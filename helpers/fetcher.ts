export async function fetcher<T>({
  url,
  method = "GET",
}: {
  url: string;
  method?: "GET" | "POST";
}): Promise<T> {
  const res = await fetch(url, {
    method,
  });
  if (!res.ok)
    throw new Error(
      `Fetch request responded with status code '${res.status}' - (${res.statusText}).`
    );
  const json = (await res.json()) as T;
  return json;
}
