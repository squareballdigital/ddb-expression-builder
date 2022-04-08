export type ExpressionAttributeCollectionInit<Value> = Iterable<
  [string, Value]
>;

const MAX_KEY_LENGTH = 15;

export class ExpressionAttributeCollection<Value>
  implements Iterable<[string, Value]>
{
  private readonly prefix: string;
  private readonly preserve: boolean;
  private readonly values = new Map<string, Value>();

  constructor(
    prefix: string,
    values?: ExpressionAttributeCollectionInit<Value>,
    preserve = false
  ) {
    this.prefix = prefix;
    this.values = new Map<string, Value>(values ?? []);
    this.preserve = preserve;
  }

  public [Symbol.iterator](): Iterator<[string, Value], any, undefined> {
    return this.values[Symbol.iterator]();
  }

  public add(value: Value): string {
    let key: string | undefined;
    for (const [k, v] of this.values.entries()) {
      if (v === value) {
        key = k;
        break;
      }
    }
    if (!key) {
      key = this.getKey(value);
    }
    this.values.set(key, value);
    return key;
  }

  public toJSON(): Record<string, Value> | undefined {
    if (!this.values.size) {
      return;
    }
    return Object.fromEntries(this.values);
  }

  private getKey(value: Value): string {
    const baseKey = `${this.prefix}f${this.values.size}`;
    if (!this.preserve || typeof value !== "string") {
      return baseKey;
    }
    return (
      baseKey + value.replace(/[^A-Za-z0-9]/g, "").slice(0, MAX_KEY_LENGTH)
    );
  }
}
