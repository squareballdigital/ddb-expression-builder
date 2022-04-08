import {
  ConstantValueExpression,
  LogicExpression,
  ValueExpression,
  ValueExpressionNodeType,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { BetweenExpressionNode } from "./BetweenExpressionNode";
import { BinaryExpressionNode } from "./BinaryExpressionNode";
import { ExpressionNodeBase } from "./ExpressionNodeBase";
import { InExpressionNode } from "./InExpressionNode";

export abstract class ValueExpressionNodeBase<
  Node extends ValueExpressionNodeType,
  Value
> extends ExpressionNodeBase<Node> {
  constructor(type: Node) {
    super(type);
  }

  public between(
    lower: Value | ValueExpression<Value>,
    upper: Value | ValueExpression<Value>
  ): LogicExpression {
    return new BetweenExpressionNode(this, wrapConst(lower), wrapConst(upper));
  }

  public equals(value: Value | ValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.Equal, this, wrapConst(value));
  }

  public greaterThan(value: Value | ValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.GreaterThan,
      this,
      wrapConst(value)
    );
  }

  public greaterOrEqual(
    value: Value | ValueExpression<Value>
  ): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.GreaterOrEqual,
      this,
      wrapConst(value)
    );
  }

  public in(values: (Value | ValueExpression<Value>)[]): LogicExpression {
    return new InExpressionNode(this, values.map(wrapConst));
  }

  public lessOrEqual(value: Value | ValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.LessOrEqual,
      this,
      wrapConst(value)
    );
  }

  public lessThan(value: Value | ValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.LessThan, this, wrapConst(value));
  }

  public notEqual(value: Value | ValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.NotEqual, this, wrapConst(value));
  }
}

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

export function wrapConst<T>(
  value: ValueExpression<T> | T
): ValueExpression<T> {
  if (value instanceof ValueExpressionNodeBase) {
    return value;
  }
  return new ConstantValueExpressionNode(value as T);
}
