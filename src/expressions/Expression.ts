import { ExpressionContext } from "./ExpressionContext";
import { NodeType } from "./NodeType";

export type ConstantOrNameNodeType = NodeType.ConstantValue | NodeType.Name;

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

export type LogicExpressionValueNodeType =
  | NodeType.ConstantValue
  | NodeType.Name
  | NodeType.Size;

export type UpdateValueNodeType =
  | NodeType.Add
  | NodeType.ConstantValue
  | NodeType.IfNotExists
  | NodeType.ListAppend
  | NodeType.Name
  | NodeType.Subtract;

export interface ConstantOrNameExpression<
  T = any,
  N extends ConstantOrNameNodeType = ConstantOrNameNodeType
> extends Expression<N>,
    ValueLogicBuilder<T> {}

export interface ConstantValueExpression<T = any>
  extends Expression<NodeType.ConstantValue>,
    ValueLogicBuilder<T>,
    ValueUpdateBuilder<T> {}

export interface Expression<N extends NodeType = NodeType> {
  build(ctx: ExpressionContext, parent?: Expression): string;
  type: N;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogicExpression<
  N extends LogicExpressionNodeType = LogicExpressionNodeType
> extends Expression<N> {}

export interface LogicValueExpression<
  T,
  N extends LogicExpressionValueNodeType = LogicExpressionValueNodeType
> extends Expression<N>,
    ValueLogicBuilder<T> {}

export interface NameExpression<T = any>
  extends Expression<NodeType.Name>,
    NameLogicBuilder<T>,
    NameUpdateBuilder<T>,
    ValueLogicBuilder<T>,
    ValueUpdateBuilder<T> {}

export interface NameLogicBuilder<T> {
  beginsWith(value: ConstantValueExpression<T> | T): LogicExpression;
  contains(value: ConstantValueExpression<T> | T): LogicExpression;
  exists(): LogicExpression;
  hasType(type: ConstantValueExpression<string> | string): LogicExpression;
  notExists(): LogicExpression;
  size(): LogicValueExpression<number>;
}

export interface NameUpdateBuilder<T> {
  ifNotExists(value: UpdateValueExpression<T>): UpdateValueExpression<T>;
}

export interface UpdateValueExpression<
  T,
  N extends UpdateValueNodeType = UpdateValueNodeType
> extends Expression<N>,
    ValueUpdateBuilder<T> {}

export interface ValueLogicBuilder<T> {
  between(
    lower: ConstantValueExpression<T> | T,
    upper: ConstantValueExpression<T> | T
  ): LogicExpression;
  equals(value: LogicValueExpression<T> | T): LogicExpression;
  greaterThan(value: LogicValueExpression<T> | T): LogicExpression;
  greaterOrEqual(value: LogicValueExpression<T> | T): LogicExpression;
  in(values: (LogicValueExpression<T> | T)[]): LogicExpression;
  lessOrEqual(value: LogicValueExpression<T> | T): LogicExpression;
  lessThan(value: LogicValueExpression<T> | T): LogicExpression;
  notEqual(value: LogicValueExpression<T> | T): LogicExpression;
}

export interface ValueUpdateBuilder<T> {
  add(value: UpdateValueExpression<T>): UpdateValueExpression<T>;
  listAppend(value: T | UpdateValueExpression<T>): UpdateValueExpression<T>;
  subtract(value: UpdateValueExpression<T>): UpdateValueExpression<T>;
}
