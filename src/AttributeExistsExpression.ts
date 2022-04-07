import { LogicExpression } from "./LogicExpression.js";
import { NameNode } from "./NameNode.js";
import { NodeType } from "./NodeType.js";

export class AttributeExistsExpression extends LogicExpression {
  constructor(public readonly path: NameNode) {
    super(NodeType.AttributeExists);
  }
}
