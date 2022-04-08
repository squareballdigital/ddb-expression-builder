import {
  LogicValueExpression,
  NameExpression,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { ExpressionNodeBase } from "./ExpressionNodeBase";

const PathOperandFunctionNames = {
  [NodeType.AttributeType]: "attribute_type",
  [NodeType.BeginsWith]: "begins_with",
  [NodeType.Contains]: "contains",
};

export type PathOperandFunctionNodeType = keyof typeof PathOperandFunctionNames;

export class PathOperandFunctionExpressionNode<
  Node extends PathOperandFunctionNodeType,
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
      PathOperandFunctionNames[this.type],
      "(",
      this.path,
      ", ",
      this.operand,
      ")",
    ]);
  }
}
