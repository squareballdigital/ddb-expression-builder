import { LogicExpression } from "./LogicExpression.js";
import { NameNode } from "./NameNode.js";
import { NodeType } from "./NodeType.js";
import { ValueNode } from "./ValueNode.js";

export class ContainsExpression extends LogicExpression {
  constructor(
    public readonly path: NameNode,
    public readonly value: ValueNode
  ) {
    super(NodeType.Contains);
  }
}
