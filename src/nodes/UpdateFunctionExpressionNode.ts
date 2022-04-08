import {
  LogicValueExpression,
  NameExpression,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

const UpdateFunctionNames = {
  [NodeType.IfNotExists]: "if_not_exists",
  [NodeType.ListAppend]: "list_append",
};

export type UpdateFunctionNodeType = keyof typeof UpdateFunctionNames;

export class UpdateFunctionExpressionNode<
  Node extends UpdateFunctionNodeType,
  T
> extends ExpressionNodeBase<Node> {
  constructor(
    type: Node,
    public readonly path: NameExpression,
    public readonly operand: LogicValueExpression<T>
  ) {
    super(type);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.format(ctx, [
      UpdateFunctionNames[this.type],
      "(",
      this.path,
      ", ",
      this.operand,
      ")",
    ]);
  }
}
