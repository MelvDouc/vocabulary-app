import { readFile } from "node:fs/promises";

const cache = new Map<string, Buffer>();

export async function readFileCached(path: string): Promise<Buffer | null> {
  if (cache.has(path))
    return cache.get(path) as Buffer;

  try {
    const buffer = await readFile(path);
    cache.set(path, buffer);
    return buffer;
  } catch {
    return null;
  }
}