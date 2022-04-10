import {
  LogicExpression,
  LogicValueExpression,
  NodeType,
} from "../expressions/expressions.js";
import { formatExpr } from "../internal/formatExpr.js";
import { DeepIndexType, DeepKeyPaths } from "../util/DeepKeyPaths.js";
import { getPrecedence } from "../util/getPrecedence.js";
import { LogicNameNode, LogicValueNode, Node } from "./builders.js";
import { ExpressionContext } from "./ExpressionContext.js";
import { ExpressionNode } from "./ExpressionNode.js";

export class LogicExpressionBuilder<T> {
  public static build<T>(
    ctx: ExpressionContext,
    builder: (b: LogicExpressionBuilder<T>) => Node<LogicExpression>
  ): string {
    const expr = builder(new LogicExpressionBuilder());
    return this.walk(ctx, expr.expr, undefined);
  }

  private static walk(
    ctx: ExpressionContext,
    node: LogicExpression | LogicValueExpression,
    prev: LogicExpression | LogicValueExpression | undefined
  ): string {
    const wrap = prev && getPrecedence(node.type) < getPrecedence(prev.type);

    switch (node.type) {
      case NodeType.And:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            " AND ",
            this.walk(ctx, node.right, node),
          ],
          { wrap }
        );

      case NodeType.AttributeExists:
        return formatExpr([
          "attribute_exists(",
          this.walk(ctx, node.path, node),
          ")",
        ]);

      case NodeType.AttributeNotExists:
        return formatExpr([
          "attribute_not_exists(",
          this.walk(ctx, node.path, node),
          ")",
        ]);

      case NodeType.AttributeType:
        return formatExpr([
          "attribute_type(",
          this.walk(ctx, node.path, node),
          ", ",
          this.walk(ctx, node.operand, node),
          ")",
        ]);

      case NodeType.BeginsWith:
        return formatExpr([
          "begins_with(",
          this.walk(ctx, node.path, node),
          ", ",
          this.walk(ctx, node.value, node),
          ")",
        ]);

      case NodeType.Between:
        return formatExpr([
          this.walk(ctx, node.value, node),
          " BETWEEN ",
          this.walk(ctx, node.lower, node),
          " AND ",
          this.walk(ctx, node.upper, node),
        ]);

      case NodeType.ConstantValue:
        return ctx.addValue(node.value);

      case NodeType.Contains:
        return formatExpr([
          "contains(",
          this.walk(ctx, node.path, node),
          ", ",
          this.walk(ctx, node.value, node),
          ")",
        ]);

      case NodeType.Equal:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            "=",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.GreaterOrEqual:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            ">=",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.GreaterThan:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            ">",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.In:
        return formatExpr([
          this.walk(ctx, node.value, node),
          " IN ",
          formatExpr(
            node.operands.map((x) => this.walk(ctx, x, node)),
            { wrap: true, separator: ", " }
          ),
        ]);

      case NodeType.LessOrEqual:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            "<=",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.LessThan:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            "<",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.Name:
        return ctx.addName(...node.name);

      case NodeType.Not:
        return formatExpr(["NOT", this.walk(ctx, node.operand, node)], {
          wrap,
          separator: " ",
        });

      case NodeType.NotEqual:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            "<>",
            this.walk(ctx, node.right, node),
          ],
          { wrap, separator: " " }
        );

      case NodeType.Or:
        return formatExpr(
          [
            this.walk(ctx, node.left, node),
            " OR ",
            this.walk(ctx, node.right, node),
          ],
          { wrap }
        );

      case NodeType.Size:
        return formatExpr(["size(", this.walk(ctx, node.operand, node), ")"]);

      default:
        throw new Error(`unexpected node type ${(node as any).type}`);
    }
  }

  public and(
    ...terms: Node<LogicExpression<DeepKeyPaths<T>>>[]
  ): Node<LogicExpression<DeepKeyPaths<T>>> {
    return this.andOr(NodeType.And, terms) as any;
  }

  public field<N extends DeepKeyPaths<T>>(
    ...path: N
  ): LogicNameNode<DeepKeyPaths<T>, DeepIndexType<T, N>> {
    return ExpressionNode.field(path) as any;
  }

  public not(
    operand: Node<LogicExpression<DeepKeyPaths<T>>>
  ): Node<LogicExpression<DeepKeyPaths<T>>> {
    return ExpressionNode.not(operand) as any;
  }

  public or(
    ...terms: Node<LogicExpression<DeepKeyPaths<T>>>[]
  ): Node<LogicExpression<DeepKeyPaths<T>>> {
    return this.andOr(NodeType.Or, terms) as any;
  }

  public value<N extends DeepKeyPaths<T>>(
    ...path: N
  ): LogicValueNode<DeepKeyPaths<T>, DeepIndexType<T, N>> {
    return ExpressionNode.value(path) as any;
  }

  private andOr(
    type: NodeType.And | NodeType.Or,
    terms: Node<LogicExpression>[]
  ): Node<LogicExpression> {
    const stack = terms.slice().reverse();

    while (stack.length >= 2) {
      const a = stack.pop() as Node<LogicExpression>;
      const b = stack.pop() as Node<LogicExpression>;

      stack.push(ExpressionNode.andOr(type, a, b));
    }
    if (stack.length === 1) {
      return stack[0];
    }
    throw new Error(`expected ${type} expression to have at least two terms`);
  }
}
