export enum NodeType {
  Add = "Add",
  AddClause = "AddClause",
  And = "And",
  SetClause = "SetClause",
  AttributeExists = "AttributeExists",
  AttributeNotExists = "AttributeNotExists",
  AttributeType = "AttributeType",
  BeginsWith = "BeginsWith",
  Between = "Between",
  ConstantValue = "ConstantValue",
  Contains = "Contains",
  DeleteClause = "DeleteClause",
  Equal = "Equal",
  GreaterOrEqual = "GreaterOrEqual",
  GreaterThan = "GreaterThan",
  IfNotExists = "IfNotExists",
  In = "In",
  LessOrEqual = "LessOrEqual",
  LessThan = "LessThan",
  ListAppend = "ListAppend",
  Name = "Name",
  Not = "Not",
  NotEqual = "NotEqual",
  Or = "Or",
  RemoveClause = "RemoveClause",
  Subtract = "Subtract",
  Size = "Size",
}

export interface AddExpression<Name extends string[] = string[], Value = any> {
  type: NodeType.Add;
  left: UpdateValueExpression<Name, Value>;
  right: UpdateValueExpression<Name, Value>;
}

export interface AddClauseExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.AddClause;
  path: NameExpression<Name>;
  value: UpdateValueExpression<Name, Value>;
}

export interface AndExpression<Name extends string[] = string[]> {
  type: NodeType.And;
  left: LogicExpression<Name>;
  right: LogicExpression<Name>;
}

export interface AttributeExistsExpression<Name extends string[] = string[]> {
  type: NodeType.AttributeExists;
  path: NameExpression<Name>;
}

export interface AttributeNotExistsExpression<
  Name extends string[] = string[]
> {
  type: NodeType.AttributeNotExists;
  path: NameExpression<Name>;
}

export interface AttributeTypeExpression<Name extends string[] = string[]> {
  type: NodeType.AttributeType;
  path: NameExpression<Name>;
  operand: ConstantValueExpression<string>;
}

export interface BeginsWithExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.BeginsWith;
  path: NameExpression<Name>;
  value: NameOrConstantExpression<Name, Value>;
}

export interface BetweenExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.Between;
  lower: NameOrConstantExpression<Name, Value>;
  upper: NameOrConstantExpression<Name, Value>;
  value: NameOrConstantExpression<Name, Value>;
}

export interface ConstantValueExpression<Value = any> {
  type: NodeType.ConstantValue;
  value: Value;
}

export interface ContainsExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.Contains;
  path: NameExpression<Name>;
  value: NameOrConstantExpression<Name, Value>;
}

export interface DeleteClauseExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.DeleteClause;
  path: NameExpression<Name>;
  value: UpdateValueExpression<Name, Value>;
}

export interface EqualExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.Equal;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface GreaterOrEqualExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.GreaterOrEqual;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface GreaterThanExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.GreaterThan;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface IfNotExistsExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.IfNotExists;
  path: NameExpression<Name>;
  value: UpdateValueExpression<Name, Value>;
}

export interface InExpression<Name extends string[] = string[], Value = any> {
  type: NodeType.In;
  value: LogicValueExpression<Name, Value>;
  operands: LogicValueExpression<Name, Value>[];
}

export interface LessThanExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.LessThan;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface LessOrEqualExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.LessOrEqual;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface ListAppendExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.ListAppend;
  list1: UpdateValueExpression<Name, Value>;
  list2: UpdateValueExpression<Name, Value>;
}

export interface NameExpression<Name extends string[] = string[]> {
  type: NodeType.Name;
  name: Name;
}

export interface NotEqualExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.NotEqual;
  left: LogicValueExpression<Name, Value>;
  right: LogicValueExpression<Name, Value>;
}

export interface NotExpression<Name extends string[] = string[]> {
  type: NodeType.Not;
  operand: LogicExpression<Name>;
}

export interface OrExpression<Name extends string[] = string[]> {
  type: NodeType.Or;
  left: LogicExpression<Name>;
  right: LogicExpression<Name>;
}

export interface RemoveClauseExpression<Name extends string[] = string[]> {
  type: NodeType.RemoveClause;
  path: NameExpression<Name>;
}

export interface SetClauseExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.SetClause;
  path: NameExpression<Name>;
  value: UpdateValueExpression<Name, Value>;
}

export interface SizeExpression<Name extends string[] = string[]> {
  type: NodeType.Size;
  operand: NameExpression<Name>;
}

export interface SubtractExpression<
  Name extends string[] = string[],
  Value = any
> {
  type: NodeType.Subtract;
  left: UpdateValueExpression<Name, Value>;
  right: UpdateValueExpression<Name, Value>;
}

export interface UpdateStatement<Name extends string[] = string[]> {
  add?: AddClauseExpression<Name>[];
  delete?: DeleteClauseExpression<Name>[];
  remove?: RemoveClauseExpression<Name>[];
  set?: SetClauseExpression<Name>[];
}

///////////////////

export type Expression =
  | ConstantValueExpression
  | LogicExpression
  | LogicTermExpression
  | NameExpression
  | SizeExpression
  | UpdateClauseExpression
  | UpdateValueExpression;

export type LogicExpression<Name extends string[] = string[]> =
  | AndExpression<Name>
  | NotExpression<Name>
  | OrExpression<Name>
  | LogicTermExpression<Name>;

export type LogicTermExpression<Name extends string[] = string[]> =
  | AttributeExistsExpression<Name>
  | AttributeNotExistsExpression<Name>
  | AttributeTypeExpression<Name>
  | BeginsWithExpression<Name>
  | BetweenExpression<Name>
  | ContainsExpression<Name>
  | EqualExpression<Name>
  | GreaterOrEqualExpression<Name>
  | GreaterThanExpression<Name>
  | InExpression<Name>
  | LessOrEqualExpression<Name>
  | LessThanExpression<Name>
  | NotEqualExpression<Name>;

export type LogicValueExpression<
  Name extends string[] = string[],
  Value = any
> =
  | NameExpression<Name>
  | ConstantValueExpression<Value>
  | SizeExpression<Name>;

export type NameOrConstantExpression<
  Name extends string[] = string[],
  Value = any
> = ConstantValueExpression<Value> | NameExpression<Name>;

export type UpdateClauseExpression<
  Name extends string[] = string[],
  Value = any
> =
  | AddClauseExpression<Name, Value>
  | DeleteClauseExpression<Name>
  | RemoveClauseExpression<Name>
  | SetClauseExpression<Name, Value>;

export type UpdateValueExpression<
  Name extends string[] = string[],
  Value = any
> =
  | AddExpression<Name, Value>
  | ConstantValueExpression<Value>
  | IfNotExistsExpression<Name, Value>
  | ListAppendExpression<Name, Value>
  | NameExpression<Name>
  | SubtractExpression<Name, Value>;
