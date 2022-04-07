import { LogicExpression } from "./LogicExpression";
import { NodeType } from "./NodeType.js";

export class NotExpression extends LogicExpression {
  constructor(public readonly operand: LogicExpression) {
    super(NodeType.Not);
  }
}
