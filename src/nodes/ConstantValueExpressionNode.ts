import { ConstantValueExpression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";
import { ValueExpressionNodeBase } from "./ValueExpressionNodeBase.js";

export class ConstantValueExpressionNode<T>
  extends ValueExpressionNodeBase<NodeType.ConstantValue, T>
  implements ConstantValueExpression<T>
{
  constructor(public readonly value: T) {
    super(NodeType.ConstantValue);
  }

  public override build(ctx: ExpressionContext): string {
    return ctx.addValue(this.value);
  }
}
