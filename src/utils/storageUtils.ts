export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage<T>(key: string): T | null {
  const rawValue = localStorage.getItem(key);
  return rawValue ? (JSON.parse(rawValue) as T) : null;
}

export function removeFromStorage(key: string): void {
  localStorage.removeItem(key);
}
