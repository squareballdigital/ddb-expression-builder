import { LogicExpression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

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
