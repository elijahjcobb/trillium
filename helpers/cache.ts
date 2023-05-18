import kv from "@vercel/kv";

export interface CacheConfig {
  key: string;
  value: any;
  ttlSeconds?: number;
}

export async function setCache({
  key,
  value,
  ttlSeconds,
}: CacheConfig): Promise<void> {
  await kv.set(
    key,
    JSON.stringify(value),
    ttlSeconds === undefined ? undefined : { ex: ttlSeconds }
  );
}

export function getCache<T>(key: string): Promise<T | null> {
  return kv.get(key);
}

export const TTL_ONE_DAY = 60 * 60 * 24;

export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  expensiveFunction: () => Promise<T>
): Promise<T> {
  let value = await getCache<T>(key);
  if (!value) {
    value = await expensiveFunction();
    await setCache({ key, value, ttlSeconds });
  }
  return value;
}
