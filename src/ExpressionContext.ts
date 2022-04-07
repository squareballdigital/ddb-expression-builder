import { ExpressionAttributeCollection } from "./ExpressionAttributeCollection.js";

export interface ExpressionCommandBase {
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, unknown>;
}

export class ExpressionContext<Name extends string[] = string[]> {
  private readonly names = new ExpressionAttributeCollection<string>("#");
  private readonly values = new ExpressionAttributeCollection(":");

  public addName(...name: Name): string {
    return name.map((x) => this.names.add(x)).join(".");
  }

  public addValue(value: unknown): string {
    return this.values.add(value);
  }

  public toJSON(): ExpressionCommandBase {
    const names = this.names.toJSON();
    const values = this.values.toJSON();
    const ret: ExpressionCommandBase = {};

    if (names) {
      ret.ExpressionAttributeNames = names;
    }
    if (values) {
      ret.ExpressionAttributeValues = values;
    }
    return ret;
  }
}
