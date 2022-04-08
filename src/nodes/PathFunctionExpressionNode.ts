import { NameExpression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";
import { ExpressionNodeBase } from "./ExpressionNodeBase.js";

const PathFunctionNames = {
  [NodeType.AttributeExists]: "attribute_exists",
  [NodeType.AttributeNotExists]: "attribute_not_exists",
};

export type PathFunctionNodeType = keyof typeof PathFunctionNames;

export class PathFunctionExpressionNode<
  Node extends PathFunctionNodeType
> extends ExpressionNodeBase<Node> {
  constructor(type: Node, public readonly path: NameExpression) {
    super(type);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(ctx, [
      PathFunctionNames[this.type],
      "(",
      this.path,
      ")",
    ]);
  }
}
