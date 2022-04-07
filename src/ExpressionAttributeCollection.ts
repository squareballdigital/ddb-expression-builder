export class ExpressionAttributeCollection<Value> {
  private readonly prefix: string;
  private readonly values = new Map<string, Value>();

  constructor(prefix: string, values?: Iterable<[string, Value]>) {
    this.prefix = prefix;
    this.values = new Map<string, Value>(values ?? []);
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
      key = `${this.prefix}f${this.values.size}`;
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
}
