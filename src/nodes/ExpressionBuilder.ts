import { DeepIndexType, DeepKeyPaths } from "../expressions/DeepKeyPaths.js";
import { Expression, NameExpression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NameExpressionNode } from "./NameExpressionNode.js";

export class ExpressionBuilder<T> {
  public static build<T>(
    builder: (b: ExpressionBuilder<T>) => Expression,
    ctx: ExpressionContext
  ): string {
    return builder(new this()).build(ctx);
  }

  public field<N extends DeepKeyPaths<T>>(
    ...name: N
  ): NameExpression<DeepIndexType<T, N>> {
    return new NameExpressionNode(name);
  }
}
