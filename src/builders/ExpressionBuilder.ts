import {
  LogicExpression,
  UpdateClauseExpression,
} from "../expressions/expressions";
import { Node } from "./builders";
import { ExpressionContext } from "./ExpressionContext";
import { LogicExpressionBuilder } from "./LogicExpressionBuilder";
import { UpdateExpressionBuilder } from "./UpdateExpressionBuilder";

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
