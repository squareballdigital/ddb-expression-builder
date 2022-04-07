import { LogicExpression } from "./LogicExpression.js";
import { NodeType } from "./NodeType.js";
import { ValueExpression } from "./ValueExpression.js";

export class InExpression extends LogicExpression {
  constructor(
    public readonly value: ValueExpression,
    public readonly operands: ValueExpression[]
  ) {
    super(NodeType.In);
  }
}
