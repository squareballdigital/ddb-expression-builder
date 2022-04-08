import { NodeType } from "./NodeType";

// see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Precedence

let n = 0;
const precedence: Record<NodeType, number> = {
  [NodeType.Or]: ++n,
  [NodeType.And]: ++n,
  [NodeType.Not]: ++n,
  [NodeType.AttributeExists]: ++n,
  [NodeType.AttributeNotExists]: n,
  [NodeType.AttributeType]: n,
  [NodeType.BeginsWith]: n,
  [NodeType.Contains]: n,
  [NodeType.Between]: ++n,
  [NodeType.In]: ++n,
  [NodeType.Equal]: ++n,
  [NodeType.NotEqual]: n,
  [NodeType.LessThan]: n,
  [NodeType.LessOrEqual]: n,
  [NodeType.GreaterThan]: n,
  [NodeType.GreaterOrEqual]: n,
  [NodeType.Size]: ++n,
  [NodeType.ConstantValue]: n,
  [NodeType.Name]: n,
};

export function getPrecedence(type: NodeType): number {
  return precedence[type];
}
