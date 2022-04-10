import { ExpressionAttributeMap } from "./ExpressionAttributeMap.js";

const MAX_KEY_LENGTH = 15;

export class ExpressionAttributeCollection<Value>
  implements ExpressionAttributeMap<Value>
{
  private readonly prefix: string;
  private readonly preserve: boolean;
  private readonly _values = new Map<string, Value>();

  public get size(): number {
    return this._values.size;
  }

  constructor(
    prefix: string,
    values?: Iterable<[string, Value]>,
    preserve = false
  ) {
    this._values = new Map<string, Value>(values ?? []);
    this.prefix = prefix;
    this.preserve = preserve;
  }

  public [Symbol.iterator](): IterableIterator<[string, Value]> {
    return this._values[Symbol.iterator]();
  }

  public add(value: Value): string {
    let key: string | undefined;
    for (const [k, v] of this._values.entries()) {
      if (v === value) {
        key = k;
        break;
      }
    }
    if (!key) {
      key = this.getKey(value);
    }
    this._values.set(key, value);
    return key;
  }

  public entries(): IterableIterator<[string, Value]> {
    return this._values.entries();
  }

  public forEach(
    callbackfn: (
      value: Value,
      key: string,
      map: ReadonlyMap<string, Value>
    ) => void,
    thisArg?: any
  ): void {
    this._values.forEach(callbackfn, thisArg);
  }

  public get(key: string): Value | undefined {
    return this._values.get(key);
  }

  public has(key: string): boolean {
    return this._values.has(key);
  }

  public keys(): IterableIterator<string> {
    return this._values.keys();
  }

  public toObject(): Record<string, Value> {
    return Object.fromEntries(this._values);
  }

  public values(): IterableIterator<Value> {
    return this._values.values();
  }

  private getKey(value: Value): string {
    const baseKey = `${this.prefix}f${this._values.size}`;
    if (!this.preserve || typeof value !== "string") {
      return baseKey;
    }
    return (
      baseKey + value.replace(/[^A-Za-z0-9]/g, "").slice(0, MAX_KEY_LENGTH)
    );
  }
}
