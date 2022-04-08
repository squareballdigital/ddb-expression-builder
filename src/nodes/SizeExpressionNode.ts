import { NameExpression, SizeExpression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";
import { ValueExpressionNodeBase } from "./ValueExpressionNodeBase.js";

export class SizeExpressionNode
  extends ValueExpressionNodeBase<NodeType.Size, number>
  implements SizeExpression
{
  constructor(public readonly path: NameExpression) {
    super(NodeType.Size);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(ctx, ["size(", this.path, ")"]);
  }
}
