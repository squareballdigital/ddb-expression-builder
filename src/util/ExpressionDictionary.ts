import { ExpressionContext } from "../builders/ExpressionContext.js";
import {
  ExpressionAttributeCollection,
  ExpressionAttributeCollectionInit,
} from "./ExpressionAttributeCollection.js";
import { ExpressionCommandInputBase } from "./ExpressionCommandInputBase.js";

export class ExpressionDictionary implements ExpressionContext {
  public readonly names: ExpressionAttributeCollection<string>;
  public readonly values: ExpressionAttributeCollection<any>;

  constructor(
    names?: ExpressionAttributeCollectionInit<string>,
    values?: ExpressionAttributeCollectionInit<any>,
    preserveNames?: boolean
  ) {
    this.names = new ExpressionAttributeCollection("#", names, preserveNames);
    this.values = new ExpressionAttributeCollection(":", values);
  }

  public addName(...name: string[]): string {
    return name.map((x) => this.names.add(x)).join(".");
  }

  public addValue(value: unknown): string {
    return this.values.add(value);
  }

  public toJSON(): ExpressionCommandInputBase {
    const names = this.names.toJSON();
    const values = this.values.toJSON();

    const obj: ExpressionCommandInputBase = {};

    if (names) {
      obj.ExpressionAttributeNames = names;
    }
    if (values) {
      obj.ExpressionAttributeValues = values;
    }

    return obj;
  }
}
