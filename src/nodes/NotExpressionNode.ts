import { LogicExpression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";
import { ExpressionNodeBase } from "./ExpressionNodeBase.js";

export class NotExpressionNode extends ExpressionNodeBase<NodeType.Not> {
  constructor(public readonly operand: LogicExpression) {
    super(NodeType.Not);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(ctx, ["NOT", this.operand], {
      separator: " ",
    });
  }
}
