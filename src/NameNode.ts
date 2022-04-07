import { DeepIndexType, DeepKeyPaths } from "./DeepKeyPaths.js";
import { NodeType } from "./NodeType.js";
import { ValueExpression } from "./ValueExpression.js";

export class NameNode<
  T = any,
  N extends DeepKeyPaths<T> = DeepKeyPaths<T>
> extends ValueExpression<DeepIndexType<T, N>> {
  public readonly name: N;

  constructor(...name: N) {
    super(NodeType.Name);
    this.name = name;
  }
}
