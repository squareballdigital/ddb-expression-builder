import { ExpressionContext } from "./ExpressionContext";
import { NodeType } from "./NodeType";

export type LogicExpressionTermNodeType =
  | NodeType.AttributeExists
  | NodeType.AttributeNotExists
  | NodeType.AttributeType
  | NodeType.BeginsWith
  | NodeType.Between
  | NodeType.Contains
  | NodeType.Equal
  | NodeType.GreaterOrEqual
  | NodeType.GreaterThan
  | NodeType.In
  | NodeType.LessOrEqual
  | NodeType.LessThan
  | NodeType.NotEqual;

export type LogicExpressionNodeType =
  | LogicExpressionTermNodeType
  | NodeType.And
  | NodeType.Not
  | NodeType.Or;

export type ValueExpressionNodeType =
  | NodeType.ConstantValue
  | NodeType.Name
  | NodeType.Size;

export interface Expression<T extends NodeType = NodeType> {
  build(ctx: ExpressionContext, parent?: Expression): string;
  type: T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogicExpression<
  N extends LogicExpressionNodeType = LogicExpressionNodeType
> extends Expression<N> {}

export interface ValueExpression<
  T,
  N extends ValueExpressionNodeType = ValueExpressionNodeType
> extends Expression<N> {
  between(
    lower: ConstantValueExpression<T> | T,
    upper: ConstantValueExpression<T> | T
  ): LogicExpression;
  equals(value: ValueExpression<T> | T): LogicExpression;
  greaterThan(value: ValueExpression<T> | T): LogicExpression;
  greaterOrEqual(value: ValueExpression<T> | T): LogicExpression;
  in(values: (ValueExpression<T> | T)[]): LogicExpression;
  lessOrEqual(value: ValueExpression<T> | T): LogicExpression;
  lessThan(value: ValueExpression<T> | T): LogicExpression;
  notEqual(value: ValueExpression<T> | T): LogicExpression;
}

/////////////////////////////

export interface AndExpression extends Expression<NodeType.And> {
  left: LogicExpression;
  right: LogicExpression;
}

export interface AttributeExistsExpression<N extends string[] = string[]>
  extends Expression<NodeType.AttributeExists> {
  path: NameExpression<any, N>;
}

export interface AttributeNotExistsExpression<N extends string[] = string[]>
  extends Expression<NodeType.AttributeNotExists> {
  path: NameExpression<any, N>;
}

export interface AttributeTypeExpression<N extends string[] = string[]>
  extends Expression<NodeType.AttributeType> {
  path: NameExpression<any, N>;
  operand: ValueExpression<string>;
}

export interface BeginsWithExpression<T = any, N extends string[] = string[]>
  extends Expression<NodeType.BeginsWith> {
  path: NameExpression<T, N>;
  operand: ValueExpression<T>;
}

export interface BetweenExpression<T = any>
  extends Expression<NodeType.Between> {
  value: ValueExpression<T>;
  lower: ValueExpression<T>;
  upper: ValueExpression<T>;
}

export interface ConstantValueExpression<T = any>
  extends ValueExpression<T, NodeType.ConstantValue> {
  value: T;
}

export interface ContainsExpression<T = any, N extends string[] = string[]>
  extends Expression<NodeType.Contains> {
  path: NameExpression<T, N>;
  operand: ValueExpression<T>;
}

export interface EqualExpression<T = any> extends Expression<NodeType.Equal> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface GreaterOrEqualExpression<T = any>
  extends Expression<NodeType.GreaterOrEqual> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface GreaterThanExpression<T = any>
  extends Expression<NodeType.GreaterThan> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface InExpression<T = any> extends Expression<NodeType.In> {
  value: ValueExpression<T>;
  match: ValueExpression<T>[];
}

export interface LessOrEqualExpression<T = any>
  extends Expression<NodeType.LessOrEqual> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface LessThanExpression<T = any>
  extends Expression<NodeType.LessThan> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface NameExpression<T = any, N extends string[] = string[]>
  extends ValueExpression<T, NodeType.Name> {
  name: N;
  beginsWith(value: ConstantValueExpression<T> | T): LogicExpression;
  contains(value: ConstantValueExpression<T> | T): LogicExpression;
  exists(): LogicExpression;
  hasType(type: ConstantValueExpression<string> | string): LogicExpression;
  notExists(): LogicExpression;
  size(): ValueExpression<number>;
}

export interface NotExpression extends Expression<NodeType.Not> {
  operand: LogicExpression;
}

export interface NotEqualExpression<T = any>
  extends Expression<NodeType.NotEqual> {
  left: ValueExpression<T>;
  right: ValueExpression<T>;
}

export interface OrExpression extends Expression<NodeType.Or> {
  left: LogicExpression;
  right: LogicExpression;
}

export interface SizeExpression<N extends string[] = string[]>
  extends ValueExpression<number, NodeType.Size> {
  path: NameExpression<N>;
}
