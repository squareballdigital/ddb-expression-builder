import {
  LogicExpression,
  LogicExpressionConstructor,
} from "./LogicExpression.js";
import { NodeType } from "./NodeType.js";

export abstract class BinaryLogicExpression extends LogicExpression {
  protected static buildTerms(
    type: LogicExpressionConstructor,
    ...terms: LogicExpression[]
  ): LogicExpression {
    const stack = terms.slice().reverse();

    while (stack.length >= 2) {
      const a = stack.pop() as LogicExpression;
      const b = stack.pop() as LogicExpression;
      stack.push(new type(a, b));
    }
    if (stack.length === 1) {
      return stack[0];
    }
    throw new Error(`expected OR expression to have at least two terms`);
  }

  constructor(
    type: NodeType.And | NodeType.Or,
    public readonly left: LogicExpression,
    public readonly right: LogicExpression
  ) {
    super(type);
  }
}
