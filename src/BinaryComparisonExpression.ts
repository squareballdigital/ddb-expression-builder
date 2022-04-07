import { BinaryComparisonType } from "./BinaryComparisonType.js";
import { ExpressionNode } from "./ExpressionNode.js";
import { ExpressionType } from "./ExpressionType.js";
import { NodeType } from "./NodeType.js";
import { ValueExpression } from "./ValueExpression.js";

export class BinaryComparisonExpression extends ExpressionNode {
  constructor(
    public readonly comparison: BinaryComparisonType,
    public readonly left: ValueExpression,
    public readonly right: ValueExpression
  ) {
    super(ExpressionType.Logic, NodeType.BinaryComparison);
  }
}
