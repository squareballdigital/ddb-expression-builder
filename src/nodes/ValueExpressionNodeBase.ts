import {
  ConstantValueExpression,
  Expression,
  LogicExpression,
  LogicValueExpression,
  UpdateValueExpression,
  ValueLogicBuilder,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { BetweenExpressionNode } from "./BetweenExpressionNode";
import { BinaryExpressionNode } from "./BinaryExpressionNode";
import { ExpressionNodeBase } from "./ExpressionNodeBase";
import { InExpressionNode } from "./InExpressionNode";
import { PathOperandFunctionExpressionNode } from "./PathOperandFunctionExpressionNode";

export abstract class ValueExpressionNodeBase<Node extends NodeType, Value>
  extends ExpressionNodeBase<Node>
  implements ValueLogicBuilder<Value>
{
  constructor(type: Node) {
    super(type);
  }

  public add(
    value: Value | UpdateValueExpression<Value>
  ): UpdateValueExpression<Value> {
    return new BinaryExpressionNode(
      NodeType.Add,
      this as UpdateValueExpression<Value>,
      wrapConst(value) as UpdateValueExpression<Value>
    );
  }

  public between(
    lower: Value | LogicValueExpression<Value>,
    upper: Value | LogicValueExpression<Value>
  ): LogicExpression {
    return new BetweenExpressionNode(this, wrapConst(lower), wrapConst(upper));
  }

  public equals(value: Value | LogicValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.Equal, this, wrapConst(value));
  }

  public greaterThan(
    value: Value | LogicValueExpression<Value>
  ): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.GreaterThan,
      this,
      wrapConst(value)
    );
  }

  public greaterOrEqual(
    value: Value | LogicValueExpression<Value>
  ): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.GreaterOrEqual,
      this,
      wrapConst(value)
    );
  }

  public in(values: (Value | LogicValueExpression<Value>)[]): LogicExpression {
    return new InExpressionNode(this, values.map(wrapConst));
  }

  public lessOrEqual(
    value: Value | LogicValueExpression<Value>
  ): LogicExpression {
    return new BinaryExpressionNode(
      NodeType.LessOrEqual,
      this,
      wrapConst(value)
    );
  }

  public lessThan(value: Value | LogicValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.LessThan, this, wrapConst(value));
  }

  public listAppend(
    value: Value | UpdateValueExpression<Value>
  ): UpdateValueExpression<Value> {
    return new PathOperandFunctionExpressionNode(
      NodeType.ListAppend,
      this,
      wrapConst(value)
    );
  }

  public notEqual(value: Value | LogicValueExpression<Value>): LogicExpression {
    return new BinaryExpressionNode(NodeType.NotEqual, this, wrapConst(value));
  }

  public subtract(
    value: Value | UpdateValueExpression<Value>
  ): UpdateValueExpression<Value> {
    return new BinaryExpressionNode(
      NodeType.Subtract,
      this as UpdateValueExpression<Value>,
      wrapConst(value) as UpdateValueExpression<Value>
    );
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

export function wrapConst<T, N extends NodeType>(
  value: T | Expression<N>
): Expression<N | NodeType.ConstantValue> & ValueLogicBuilder<T> {
  if (value instanceof ValueExpressionNodeBase) {
    return value;
  }
  return new ConstantValueExpressionNode(value);
}
