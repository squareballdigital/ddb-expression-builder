import { LogicExpression } from "./LogicExpression";
import { NodeType } from "./NodeType.js";

export class AndExpression extends LogicExpression {
  constructor(
    public readonly left: LogicExpression,
    public readonly right: LogicExpression
  ) {
    super(NodeType.And);
  }
}
