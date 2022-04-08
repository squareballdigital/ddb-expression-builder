import { LogicValueExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

export class BetweenExpressionNode<
  T
> extends ExpressionNodeBase<NodeType.Between> {
  constructor(
    public readonly value: LogicValueExpression<T>,
    public readonly lower: LogicValueExpression<T>,
    public readonly upper: LogicValueExpression<T>
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
