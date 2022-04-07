import { NodeType } from "./NodeType.js";
import { ValueExpression } from "./ValueExpression.js";

export class ValueNode<T = any> extends ValueExpression<T> {
  constructor(public readonly value: unknown) {
    super(NodeType.Value);
  }
}
