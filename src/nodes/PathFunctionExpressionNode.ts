import { NameExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

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
