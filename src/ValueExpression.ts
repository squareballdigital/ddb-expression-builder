import { BinaryComparisonExpression } from "./BinaryComparisonExpression.js";
import { BinaryComparisonType } from "./BinaryComparisonType.js";
import { ExpressionNode } from "./ExpressionNode.js";
import { ExpressionType } from "./ExpressionType.js";
import { InExpression } from "./InExpression.js";
import { NodeType } from "./NodeType.js";
import { ValueNode } from "./ValueNode.js";

export abstract class ValueExpression<T = unknown> extends ExpressionNode {
  constructor(type: NodeType) {
    super(ExpressionType.Value, type);
  }

  public equals(value: ValueExpression<T> | T): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.Equal,
      this,
      this.makeValueExpression(value)
    );
  }

  public greaterThan(
    value: ValueExpression<T> | T
  ): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.GreaterThan,
      this,
      this.makeValueExpression(value)
    );
  }

  public greaterOrEqual(
    value: ValueExpression<T> | T
  ): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.GreaterOrEqual,
      this,
      this.makeValueExpression(value)
    );
  }

  public in(values: (ValueExpression<T> | T)[]): InExpression {
    return new InExpression(
      this,
      values.map((x) => this.makeValueExpression(x))
    );
  }

  public lessOrEqual(
    value: ValueExpression<T> | T
  ): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.LessOrEqual,
      this,
      this.makeValueExpression(value)
    );
  }

  public lessThan(value: ValueExpression<T> | T): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.LessThan,
      this,
      this.makeValueExpression(value)
    );
  }

  public notEqual(value: ValueExpression<T> | T): BinaryComparisonExpression {
    return new BinaryComparisonExpression(
      BinaryComparisonType.NotEqual,
      this,
      this.makeValueExpression(value)
    );
  }

  protected makeValueExpression(
    value: ValueExpression<T> | T
  ): ValueExpression<T> {
    return value instanceof ValueExpression ? value : new ValueNode(value);
  }

  protected makeValueNode<V>(value: ValueNode<V> | V): ValueNode<V> {
    return value instanceof ValueNode ? value : new ValueNode(value);
  }
}
