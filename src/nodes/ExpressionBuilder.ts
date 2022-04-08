import { DeepIndexType, DeepKeyPaths } from "../expressions/DeepKeyPaths";
import {
  Expression,
  LogicExpression,
  NameExpression,
} from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";
import { BinaryExpressionNode } from "./BinaryExpressionNode";
import { NameExpressionNode } from "./NameExpressionNode";
import { NotExpressionNode } from "./NotExpressionNode";

export class ExpressionBuilder<T> {
  public static build<T>(
    builder: (b: ExpressionBuilder<T>) => Expression,
    ctx: ExpressionContext
  ): string {
    return builder(new this()).build(ctx);
  }

  public and(...terms: LogicExpression[]): LogicExpression {
    return this.buildLogicTerms(NodeType.And, terms);
  }

  public not(operand: LogicExpression): LogicExpression {
    return new NotExpressionNode(operand);
  }

  public or(...terms: LogicExpression[]): LogicExpression {
    return this.buildLogicTerms(NodeType.Or, terms);
  }

  public field<N extends DeepKeyPaths<T>>(
    ...name: N
  ): NameExpression<DeepIndexType<T, N>> {
    return new NameExpressionNode<DeepIndexType<T, N>>(name);
  }

  private buildLogicTerms(
    type: NodeType.And | NodeType.Or,
    terms: LogicExpression[]
  ): LogicExpression {
    const stack = terms.slice().reverse();

    while (stack.length >= 2) {
      const a = stack.pop() as LogicExpression;
      const b = stack.pop() as LogicExpression;
      stack.push(new BinaryExpressionNode(type, a, b));
    }
    if (stack.length === 1) {
      return stack[0];
    }
    throw new Error(`expected OR expression to have at least two terms`);
  }
}
