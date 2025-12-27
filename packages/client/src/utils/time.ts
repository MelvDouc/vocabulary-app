export function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number) {
  let handler = -1;

  return (...args: T): void => {
    clearTimeout(handler);
    handler = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}