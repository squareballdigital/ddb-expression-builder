import { LogicExpression } from "./LogicExpression";
import { NodeType } from "./NodeType.js";

export class OrExpression extends LogicExpression {
  constructor(
    public readonly left: LogicExpression,
    public readonly right: LogicExpression
  ) {
    super(NodeType.Or);
  }
}
