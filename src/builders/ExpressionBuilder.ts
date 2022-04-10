import {
  LogicExpression,
  UpdateClauseExpression,
} from "../expressions/expressions.js";
import { ExpressionAttributeCollection } from "../util/ExpressionAttributeCollection.js";
import { ExpressionAttributeMap } from "../util/ExpressionAttributeMap.js";
import { ExpressionCommandInputBase } from "../util/ExpressionCommandInputBase.js";
import { Node } from "./builders.js";
import { ExpressionContext } from "./ExpressionContext.js";
import { LogicExpressionBuilder } from "./LogicExpressionBuilder.js";
import { UpdateExpressionBuilder } from "./UpdateExpressionBuilder.js";

export class ExpressionBuilder implements ExpressionContext {
  public readonly names: ExpressionAttributeMap<string>;
  public readonly values: ExpressionAttributeMap<any>;

  constructor(
    names?: Iterable<[string, string]>,
    values?: Iterable<[string, any]>,
    preserveNames?: boolean
  ) {
    this.names = new ExpressionAttributeCollection("#", names, preserveNames);
    this.values = new ExpressionAttributeCollection(":", values);
  }

  public attributes(): ExpressionCommandInputBase {
    const ret: ExpressionCommandInputBase = {};
    if (this.names.size) {
      ret.ExpressionAttributeNames = this.names.toObject();
    }
    if (this.values.size) {
      ret.ExpressionAttributeValues = this.values.toObject();
    }
    return ret;
  }

  public conditionExpression<T>(
    builder: (b: LogicExpressionBuilder<T>) => Node<LogicExpression>
  ): string {
    return LogicExpressionBuilder.build(this, builder);
  }

  public updateExpression<T>(
    builder: (b: UpdateExpressionBuilder<T>) => Node<UpdateClauseExpression>[]
  ): string {
    return UpdateExpressionBuilder.build(this, builder as any);
  }
}
