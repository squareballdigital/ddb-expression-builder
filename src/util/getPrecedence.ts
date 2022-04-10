import { NodeType } from "../expressions/expressions.js";

// see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Precedence

let n = 0;
const precedence: Record<NodeType, number> = {
  [NodeType.AddClause]: n,
  [NodeType.DeleteClause]: n,
  [NodeType.RemoveClause]: n,
  [NodeType.SetClause]: n,
  [NodeType.Or]: ++n,
  [NodeType.And]: ++n,
  [NodeType.Not]: ++n,
  [NodeType.AttributeExists]: ++n,
  [NodeType.AttributeNotExists]: n,
  [NodeType.AttributeType]: n,
  [NodeType.BeginsWith]: n,
  [NodeType.Contains]: n,
  [NodeType.IfNotExists]: n,
  [NodeType.ListAppend]: n,
  [NodeType.Between]: ++n,
  [NodeType.In]: ++n,
  [NodeType.SetClause]: ++n,
  [NodeType.Equal]: ++n,
  [NodeType.NotEqual]: n,
  [NodeType.LessThan]: n,
  [NodeType.LessOrEqual]: n,
  [NodeType.GreaterThan]: n,
  [NodeType.GreaterOrEqual]: n,
  [NodeType.Add]: ++n,
  [NodeType.Subtract]: ++n,
  [NodeType.Size]: ++n,
  [NodeType.ConstantValue]: n,
  [NodeType.Name]: n,
};

export function getPrecedence(type: NodeType): number {
  return precedence[type];
}
