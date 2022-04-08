import { ValueExpression } from "../expressions/Expression.js";
import { ConstantValueExpressionNode } from "./ConstantValueExpressionNode.js";
import { ValueExpressionNodeBase } from "./ValueExpressionNodeBase.js";

export function wrapConst<T>(
  value: ValueExpression<T> | T
): ValueExpression<T> {
  if (value instanceof ValueExpressionNodeBase) {
    return value;
  }
  return new ConstantValueExpressionNode(value as T);
}
