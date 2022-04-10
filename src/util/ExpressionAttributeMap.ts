export interface ExpressionAttributeMap<T> extends ReadonlyMap<string, T> {
  add(value: T): string;
  toObject(): Record<string, T>;
}
