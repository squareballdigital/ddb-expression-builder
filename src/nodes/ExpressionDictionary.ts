import { ExpressionContext } from "../expressions/ExpressionContext.js";
import {
  ExpressionAttributeCollection,
  ExpressionAttributeCollectionInit,
} from "./ExpressionAttributeCollection.js";

export class ExpressionDictionary implements ExpressionContext {
  private readonly names: ExpressionAttributeCollection<string>;
  private readonly values: ExpressionAttributeCollection<any>;

  constructor(
    names?: ExpressionAttributeCollectionInit<string>,
    values?: ExpressionAttributeCollectionInit<any>
  ) {
    this.names = new ExpressionAttributeCollection("#", names);
    this.values = new ExpressionAttributeCollection(":", values);
  }

  public addName(...name: string[]): string {
    return name.map((x) => this.names.add(x)).join(".");
  }

  public addValue(value: unknown): string {
    return this.values.add(value);
  }
}
