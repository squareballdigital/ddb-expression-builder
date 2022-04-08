import { Expression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { getPrecedence } from "../expressions/getPrecedence.js";
import { NodeType } from "../expressions/NodeType.js";
import { ExpressionNodeBase } from "./ExpressionNodeBase.js";

export const BinaryOperators = {
  [NodeType.And]: "AND",
  [NodeType.Equal]: "=",
  [NodeType.GreaterOrEqual]: ">=",
  [NodeType.GreaterThan]: ">",
  [NodeType.LessOrEqual]: "<=",
  [NodeType.LessThan]: "<",
  [NodeType.NotEqual]: "<>",
  [NodeType.Or]: "OR",
};

export type BinaryExpressionNodeType = keyof typeof BinaryOperators;

export class BinaryExpressionNode<
  Node extends BinaryExpressionNodeType,
  Expr extends Expression
> extends ExpressionNodeBase<Node> {
  constructor(
    type: Node,
    public readonly left: Expr,
    public readonly right: Expr
  ) {
    super(type);
  }

  public override build(
    ctx: ExpressionContext,
    parent?: Expression<NodeType>
  ): string {
    return this.format(
      ctx,
      [this.left, BinaryOperators[this.type], this.right],
      {
        separator: " ",
        wrap: parent && getPrecedence(this.type) < getPrecedence(parent.type),
      }
    );
  }
}
