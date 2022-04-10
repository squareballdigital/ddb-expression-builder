import {
  LogicExpression,
  UpdateClauseExpression,
} from "../expressions/expressions.js";
import { Node } from "./builders.js";
import { ExpressionContext } from "./ExpressionContext.js";
import { LogicExpressionBuilder } from "./LogicExpressionBuilder.js";
import { UpdateExpressionBuilder } from "./UpdateExpressionBuilder.js";

export class ExpressionBuilder {
  public static conditionExpression<T>(
    ctx: ExpressionContext,
    builder: (b: LogicExpressionBuilder<T>) => Node<LogicExpression>
  ): string {
    return LogicExpressionBuilder.build(ctx, builder);
  }

  public static updateExpression<T>(
    ctx: ExpressionContext,
    builder: (b: UpdateExpressionBuilder<T>) => Node<UpdateClauseExpression>[]
  ): string {
    return UpdateExpressionBuilder.build(ctx, builder as any);
  }
}
