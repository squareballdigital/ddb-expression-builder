import { LogicExpression } from "./LogicExpression.js";
import { NameNode } from "./NameNode.js";
import { NodeType } from "./NodeType.js";
import { ValueNode } from "./ValueNode.js";

export class BetweenExpression extends LogicExpression {
  constructor(
    public readonly path: NameNode,
    public readonly lower: ValueNode,
    public readonly higher: ValueNode
  ) {
    super(NodeType.Between);
  }
}
