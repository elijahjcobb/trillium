export function simpleHash(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash += value.charCodeAt(i) + i;
  }
  return `${hash}`;
}
