import { Expression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { getPrecedence } from "../expressions/getPrecedence";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

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
