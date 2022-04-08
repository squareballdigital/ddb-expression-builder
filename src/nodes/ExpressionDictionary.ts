import { ExpressionContext } from "../expressions/ExpressionContext";
import {
  ExpressionAttributeCollection,
  ExpressionAttributeCollectionInit,
} from "./ExpressionAttributeCollection";

export class ExpressionDictionary implements ExpressionContext {
  private readonly names: ExpressionAttributeCollection<string>;
  private readonly values: ExpressionAttributeCollection<any>;

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
}
