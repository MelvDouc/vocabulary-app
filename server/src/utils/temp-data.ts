import type { Dictionary } from "$server/types.ts";

export function createTempDataStore<T extends Dictionary>(initialValue: Partial<T> = {}): Partial<T> {
  return new Proxy(initialValue, {
    get(target, key) {
      const value = target[key];
      delete target[key];
      return value;
    }
  });
}