import {
  AddClauseExpression,
  ConstantValueExpression,
  DeleteClauseExpression,
  LogicExpression,
  LogicValueExpression,
  NameExpression,
  RemoveClauseExpression,
  SetClauseExpression,
  UpdateValueExpression,
} from "../expressions/expressions.js";

export interface Node<T> {
  expr: T;
}

export type LogicNameNode<
  Name extends string[] = string[],
  Value = any
> = ValueLogicBuilder<Name, Value> &
  NameLogicBuilder<Name, Value> &
  Node<NameExpression<Name>>;

export type UpdateNameNode<
  Name extends string[] = string[],
  Value = any
> = NameUpdateBuilder<Name, Value> &
  ValueUpdateBuilder<Name, Value> &
  Node<NameExpression<Name>>;

export type LogicValueNode<
  Name extends string[] = string[],
  Value = any
> = Node<LogicValueExpression<Name, Value>> & ValueLogicBuilder<Name, Value>;

export type UpdateValueNode<
  Name extends string[] = string[],
  Value = any
> = Node<UpdateValueExpression<Name, Value>> & ValueUpdateBuilder<Name, Value>;

///////////////////

export interface ValueLogicBuilder<
  Name extends string[] = string[],
  Value = any
> {
  between(
    lower: Node<ConstantValueExpression<Value>> | Value,
    upper: Node<ConstantValueExpression<Value>> | Value
  ): Node<LogicExpression<Name>>;
  equals(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
  greaterThan(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
  greaterOrEqual(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
  in(
    ...values: (LogicValueExpression<Name, Value> | Value)[]
  ): Node<LogicExpression<Name>>;
  lessOrEqual(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
  lessThan(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
  notEqual(
    value: Node<LogicValueExpression<Name, Value>> | Value
  ): Node<LogicExpression<Name>>;
}

export interface NameUpdateBuilder<
  Name extends string[] = string[],
  Value = any
> {
  addTo(
    value: Node<UpdateValueExpression<Name, Value>> | Value
  ): Node<AddClauseExpression<Name>>;
  deleteFrom(
    value: Node<UpdateValueExpression<Name, Value>> | Value
  ): Node<DeleteClauseExpression<Name>>;
  ifNotExists(
    value: Node<UpdateValueExpression<Name, Value>> | Value
  ): UpdateValueNode<Name, Value>;
  remove(): Node<RemoveClauseExpression<Name>>;
  set(
    value: Node<UpdateValueExpression<Name, Value>> | Value
  ): Node<SetClauseExpression<Name>>;
}

export interface NameLogicBuilder<
  Name extends string[] = string[],
  Value = any
> {
  beginsWith(
    value: Node<ConstantValueExpression<Value>> | Value
  ): Node<LogicExpression<Name>>;
  contains(
    value: Node<ConstantValueExpression<Value>> | Value
  ): Node<LogicExpression<Name>>;
  exists(): Node<LogicExpression<Name>>;
  hasType(
    type: Node<ConstantValueExpression<string>> | string
  ): Node<LogicExpression<Name>>;
  notExists(): Node<LogicExpression<Name>>;
  size(): Node<LogicValueExpression<Name, number>> &
    ValueLogicBuilder<Name, Value>;
}

export interface ValueUpdateBuilder<
  Name extends string[] = string[],
  Value = any
> {
  add(
    value: Node<UpdateValueExpression<Name, Value>> | Value
  ): UpdateValueNode<Name, Value>;
  listAppend(
    value: UpdateValueExpression<Name, Value> | Value
  ): UpdateValueNode<Name, Value>;
  subtract(
    value: UpdateValueExpression<Name, Value> | Value
  ): UpdateValueNode<Name, Value>;
}
