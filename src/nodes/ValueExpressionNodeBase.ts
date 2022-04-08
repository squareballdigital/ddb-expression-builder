import {
  LogicExpression,
  ValueExpression,
  ValueExpressionBase,
} from "../expressions/Expression.js";
import { NodeType } from "../expressions/NodeType.js";
import { BetweenExpressionNode } from "./BetweenExpressionNode.js";
import { BinaryExpressionNode } from "./BinaryExpressionNode.js";
import { ExpressionNodeBase } from "./ExpressionNodeBase.js";
import { InExpressionNode } from "./InExpressionNode.js";
import { wrapConst } from "./wrapConst.js";

export abstract class ValueExpressionNodeBase<Node extends NodeType, Value>
  extends ExpressionNodeBase<Node>
  implements ValueExpressionBase<Node, Value>
{
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
