import { BetweenExpression, ValueExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

export class BetweenExpressionNode<T>
  extends ExpressionNodeBase<NodeType.Between>
  implements BetweenExpression
{
  constructor(
    public readonly value: ValueExpression<T>,
    public readonly lower: ValueExpression<T>,
    public readonly upper: ValueExpression<T>
  ) {
    super(NodeType.Between);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(
      ctx,
      [this.value, "BETWEEN", this.lower, "AND", this.upper],
      { separator: " " }
    );
  }
}
