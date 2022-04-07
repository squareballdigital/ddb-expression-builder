import { NameNode } from "./NameNode.js";
import { NodeType } from "./NodeType.js";
import { ValueExpression } from "./ValueExpression.js";

export class SizeExpression extends ValueExpression {
  constructor(public readonly path: NameNode) {
    super(NodeType.Size);
  }
}
