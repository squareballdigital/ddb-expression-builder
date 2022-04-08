import { Expression } from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";

export abstract class ExpressionNodeBase<T extends NodeType>
  implements Expression<T>
{
  constructor(public readonly type: T) {}

  public abstract build(
    ctx: ExpressionContext,
    parent?: Expression<NodeType>
  ): string;

  protected format(
    ctx: ExpressionContext,
    parts: (string | Expression)[],
    {
      separator = "",
      wrap = false,
    }: { separator?: string; wrap?: boolean } = {}
  ): string {
    const expr = parts
      .map((x) => (typeof x === "string" ? x : x.build(ctx, this)))
      .join(separator);

    return wrap ? `(${expr})` : expr;
  }
}
