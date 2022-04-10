import {
  AddClauseExpression,
  ConstantValueExpression,
  DeleteClauseExpression,
  Expression,
  LogicExpression,
  LogicValueExpression,
  NodeType,
  RemoveClauseExpression,
  SetClauseExpression,
} from "../expressions/expressions";
import {
  LogicNameNode,
  LogicValueNode,
  NameLogicBuilder,
  NameUpdateBuilder,
  Node,
  UpdateNameNode,
  UpdateValueNode,
  ValueLogicBuilder,
  ValueUpdateBuilder,
} from "./builders";

export class ExpressionNode
  implements
    Node<Expression>,
    NameLogicBuilder,
    ValueLogicBuilder,
    NameUpdateBuilder,
    ValueUpdateBuilder
{
  public static andOr(
    type: NodeType.And | NodeType.Or,
    left: Node<LogicExpression>,
    right: Node<LogicExpression>
  ): Node<LogicExpression> {
    return new ExpressionNode({
      type,
      left: left.expr,
      right: right.expr,
    });
  }

  public static field(name: string[]): LogicNameNode & UpdateNameNode {
    return new ExpressionNode({
      type: NodeType.Name,
      name,
    });
  }

  public static not(operand: Node<LogicExpression>): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.Not,
      operand: operand.expr,
    });
  }

  public static value(value: any): LogicValueNode & UpdateValueNode {
    return new ExpressionNode({
      type: NodeType.ConstantValue,
      value,
    });
  }

  public readonly expr: any;

  constructor(expr: Expression) {
    this.expr = expr;
  }

  public add(value: any): UpdateValueNode {
    return new ExpressionNode({
      type: NodeType.Add,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public addTo(value: any): Node<AddClauseExpression> {
    return new ExpressionNode({
      type: NodeType.AddClause,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public beginsWith(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.BeginsWith,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public between(lower: any, upper: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.Between,
      value: this.expr,
      lower: this.wrapConst(lower),
      upper: this.wrapConst(upper),
    });
  }

  public contains(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.Contains,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public deleteFrom(value: any): Node<DeleteClauseExpression> {
    return new ExpressionNode({
      type: NodeType.DeleteClause,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public equals(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.Equal,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public exists(): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.AttributeExists,
      path: this.expr,
    });
  }

  public greaterThan(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.GreaterThan,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public greaterOrEqual(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.GreaterOrEqual,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public hasType(
    type: string | Node<ConstantValueExpression<string>>
  ): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.AttributeType,
      path: this.expr,
      operand: this.wrapConst(type),
    });
  }

  public ifNotExists(value: any): UpdateValueNode {
    return new ExpressionNode({
      type: NodeType.IfNotExists,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public in(values: any[]): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.In,
      value: this.expr,
      operands: values.map((x) => this.wrapConst(x)),
    });
  }

  public lessOrEqual(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.LessOrEqual,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public lessThan(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.LessThan,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public listAppend(value: any): UpdateValueNode {
    return new ExpressionNode({
      type: NodeType.ListAppend,
      list1: this.expr,
      list2: this.wrapConst(value),
    });
  }

  public notEqual(value: any): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.NotEqual,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  public notExists(): Node<LogicExpression> {
    return new ExpressionNode({
      type: NodeType.AttributeNotExists,
      path: this.expr,
    });
  }

  public remove(): Node<RemoveClauseExpression> {
    return new ExpressionNode({
      type: NodeType.RemoveClause,
      path: this.expr,
    });
  }

  public set(value: any): Node<SetClauseExpression> {
    return new ExpressionNode({
      type: NodeType.SetClause,
      path: this.expr,
      value: this.wrapConst(value),
    });
  }

  public size(): Node<LogicValueExpression<string[], number>> &
    ValueLogicBuilder {
    return new ExpressionNode({
      type: NodeType.Size,
      operand: this.expr,
    });
  }

  public subtract(value: any): UpdateValueNode {
    return new ExpressionNode({
      type: NodeType.Subtract,
      left: this.expr,
      right: this.wrapConst(value),
    });
  }

  private wrapConst(value: any): any {
    if (value instanceof ExpressionNode) {
      return value.expr;
    }
    return ExpressionNode.value(value).expr;
  }
}
