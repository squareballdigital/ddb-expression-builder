import { NameExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ValueExpressionNodeBase } from "./ValueExpressionNodeBase";

export class SizeExpressionNode extends ValueExpressionNodeBase<
  NodeType.Size,
  number
> {
  constructor(public readonly path: NameExpression) {
    super(NodeType.Size);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(ctx, ["size(", this.path, ")"]);
  }
}
