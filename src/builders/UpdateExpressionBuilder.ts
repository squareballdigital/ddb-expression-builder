import {
  NodeType,
  UpdateClauseExpression,
  UpdateValueExpression,
} from "../expressions/expressions.js";
import { formatExpr } from "../internal/formatExpr.js";
import { DeepIndexType, DeepKeyPaths } from "../util/DeepKeyPaths.js";
import { getPrecedence } from "../util/getPrecedence.js";
import { Node, UpdateNameNode, UpdateValueNode } from "./builders.js";
import { ExpressionContext } from "./ExpressionContext.js";
import { ExpressionNode } from "./ExpressionNode.js";

export class UpdateExpressionBuilder<T> {
  public static build<T>(
    ctx: ExpressionContext,
    builder: (
      b: UpdateExpressionBuilder<T>
    ) => Node<UpdateClauseExpression<DeepKeyPaths<T>>>[]
  ): string {
    const result = builder(new UpdateExpressionBuilder());
    const adds: string[] = [];
    const deletes: string[] = [];
    const removes: string[] = [];
    const sets: string[] = [];

    for (const node of result) {
      const expr = node.expr;

      switch (expr.type) {
        case NodeType.AddClause:
          adds.push(
            formatExpr([
              this.visitValue(ctx, expr.path, undefined),
              " ",
              this.visitValue(ctx, expr.value, undefined),
            ])
          );
          break;

        case NodeType.DeleteClause:
          deletes.push(
            formatExpr([
              this.visitValue(ctx, expr.path, undefined),
              " ",
              this.visitValue(ctx, expr.value, undefined),
            ])
          );
          break;

        case NodeType.RemoveClause:
          removes.push(this.visitValue(ctx, expr.path, undefined));
          break;

        case NodeType.SetClause:
          sets.push(
            formatExpr([
              this.visitValue(ctx, expr.path, undefined),
              " = ",
              this.visitValue(ctx, expr.value, undefined),
            ])
          );
          break;

        default:
          throw new Error(`unexpected expression type ${(expr as any).type}`);
      }
    }

    return [
      adds.length && "ADD " + adds.join(", "),
      deletes.length && "DELETE " + deletes.join(", "),
      removes.length && "REMOVE " + removes.join(", "),
      sets.length && "SET " + sets.join(", "),
    ]
      .filter(Boolean)
      .join(" ");
  }

  private static visitValue(
    ctx: ExpressionContext,
    node: UpdateValueExpression,
    prev: UpdateValueExpression | undefined
  ): string {
    const wrap = prev && getPrecedence(node.type) < getPrecedence(prev.type);

    switch (node.type) {
      case NodeType.Add:
        return formatExpr(
          [
            this.visitValue(ctx, node.left, node),
            " + ",
            this.visitValue(ctx, node.right, node),
          ],
          { wrap }
        );

      case NodeType.ConstantValue:
        return ctx.addValue(node.value);

      case NodeType.IfNotExists:
        return formatExpr([
          "if_not_exists(",
          this.visitValue(ctx, node.path, node),
          ", ",
          this.visitValue(ctx, node.value, node),
          ")",
        ]);

      case NodeType.ListAppend:
        return formatExpr([
          "list_append(",
          this.visitValue(ctx, node.list1, node),
          ", ",
          this.visitValue(ctx, node.list2, node),
          ")",
        ]);

      case NodeType.Name:
        return ctx.addName(...node.name);

      case NodeType.Subtract:
        return formatExpr(
          [
            this.visitValue(ctx, node.left, node),
            " - ",
            this.visitValue(ctx, node.right, node),
          ],
          { wrap }
        );

      default:
        throw new Error(`unexpected expression type ${(node as any).type}`);
    }
  }

  public field<N extends DeepKeyPaths<T>>(
    ...path: N
  ): UpdateNameNode<DeepKeyPaths<T>, DeepIndexType<T, N>> {
    return ExpressionNode.field(path) as any;
  }

  public value<N extends DeepKeyPaths<T>>(
    ...path: N
  ): UpdateValueNode<DeepKeyPaths<T>, DeepIndexType<T, N>> {
    return ExpressionNode.value(path) as any;
  }
}
