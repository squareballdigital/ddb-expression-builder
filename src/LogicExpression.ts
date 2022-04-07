import { ExpressionNode } from "./ExpressionNode.js";
import { ExpressionType } from "./ExpressionType.js";
import { NodeType } from "./NodeType.js";

export interface LogicExpressionConstructor {
  new (left: LogicExpression, right: LogicExpression): LogicExpression;
}

export abstract class LogicExpression extends ExpressionNode {
  constructor(type: NodeType) {
    super(ExpressionType.Logic, type);
  }
}
