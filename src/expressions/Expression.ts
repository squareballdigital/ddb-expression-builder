import { ExpressionContext } from "./ExpressionContext.js";
import { NodeType } from "./NodeType.js";

export interface Expression<T extends NodeType = NodeType> {
  build(ctx: ExpressionContext, parent?: Expression): string;
  type: T;
}

export interface LogicExpressionBuilder<T> {
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

export interface PathLogicExpressionBuilder<T> {
  beginsWith(value: ConstantValueExpression<T> | T): LogicExpression;
  contains(value: ConstantValueExpression<T> | T): LogicExpression;
  exists(): LogicExpression;
  hasType(type: ConstantValueExpression<string> | string): LogicExpression;
  notExists(): LogicExpression;
  size(): ValueExpression<number>;
}

export interface ValueExpressionBase<Node extends NodeType, T>
  extends Expression<Node>,
    LogicExpressionBuilder<T> {}

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
  extends ValueExpressionBase<NodeType.ConstantValue, T> {
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
  extends ValueExpressionBase<NodeType.Name, T>,
    PathLogicExpressionBuilder<T> {
  name: N;
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
  extends ValueExpressionBase<NodeType.Size, number> {
  path: NameExpression<N>;
}

/////////////////////////////

export type LogicExpression =
  | AndExpression
  | NotExpression
  | OrExpression
  | LogicExpressionTerm;

export type LogicExpressionTerm =
  | AttributeExistsExpression
  | AttributeNotExistsExpression
  | AttributeTypeExpression
  | BeginsWithExpression
  | BetweenExpression
  | ContainsExpression
  | EqualExpression
  | GreaterOrEqualExpression
  | GreaterThanExpression
  | InExpression
  | LessOrEqualExpression
  | LessThanExpression
  | NotEqualExpression;

export type ValueExpression<T = any> =
  | ConstantValueExpression<T>
  | NameExpression<T>
  | SizeExpression
  | ValueExpressionBase<NodeType, T>;
