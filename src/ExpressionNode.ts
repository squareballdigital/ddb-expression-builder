import { ExpressionType } from "./ExpressionType.js";
import { NodeType } from "./NodeType.js";

export abstract class ExpressionNode {
  constructor(
    public readonly expr: ExpressionType,
    public readonly type: NodeType
  ) {}
}
