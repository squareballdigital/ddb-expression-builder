import {
  Expression,
  UpdateValueExpression,
  UpdateValueNodeType,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { getPrecedence } from "../expressions/getPrecedence";
import { NodeType } from "../expressions/NodeType";
import { BinaryExpressionNode } from "./BinaryExpressionNode";
import { ExpressionNodeBase } from "./ExpressionNodeBase";
import { wrapConst } from "./ValueExpressionNodeBase";

const UpdateBinaryOperators = {
  [NodeType.Add]: "-",
  [NodeType.Subtract]: "-",
};

export type UpdateBinaryExpressionNodeType = keyof typeof UpdateBinaryOperators;

export abstract class UpdateValueExpressionNodeBase<
    T,
    N extends UpdateValueNodeType
  >
  extends ExpressionNodeBase<N>
  implements UpdateValueExpression<T>
{
  constructor(type: N) {
    super(type);
  }

  public add(
    value: UpdateValueExpression<T, UpdateValueNodeType>
  ): UpdateValueExpression<T, UpdateValueNodeType> {
    return new UpdateBinaryExpressionNode(
      NodeType.Add,
      this as UpdateValueExpression<T>,
      wrapConst(value) as UpdateValueExpression<T>
    );
  }

  public listAppend(
    value: T | UpdateValueExpression<T, UpdateValueNodeType>
  ): UpdateValueExpression<T, UpdateValueNodeType> {
    throw new Error("Method not implemented.");
  }

  public subtract(
    value: UpdateValueExpression<T, UpdateValueNodeType>
  ): UpdateValueExpression<T, UpdateValueNodeType> {
    return new BinaryExpressionNode(NodeType.Subtract, this, wrapConst(value));
  }
}

export class UpdateBinaryExpressionNode<
  T,
  Node extends UpdateBinaryExpressionNodeType,
  Expr extends Expression
> extends UpdateValueExpressionNodeBase<T, Node> {
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
      [this.left, UpdateBinaryOperators[this.type], this.right],
      {
        separator: " ",
        wrap: parent && getPrecedence(this.type) < getPrecedence(parent.type),
      }
    );
  }
}
