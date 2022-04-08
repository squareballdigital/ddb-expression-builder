import {
  ConstantValueExpression,
  LogicExpression,
  NameExpression,
  ValueExpression,
} from "../expressions/Expression.js";
import { ExpressionContext } from "../expressions/ExpressionContext.js";
import { NodeType } from "../expressions/NodeType.js";
import { PathFunctionExpressionNode } from "./PathFunctionExpressionNode.js";
import { PathOperandFunctionExpressionNode } from "./PathOperandExpressionNode.js";
import { SizeExpressionNode } from "./SizeExpressionNode.js";
import { ValueExpressionNodeBase } from "./ValueExpressionNodeBase.js";
import { wrapConst } from "./wrapConst.js";

export class NameExpressionNode<Value>
  extends ValueExpressionNodeBase<NodeType.Name, Value>
  implements NameExpression<Value>
{
  constructor(public readonly name: string[]) {
    super(NodeType.Name);
  }

  public beginsWith(
    value: Value | ConstantValueExpression<Value>
  ): LogicExpression {
    return new PathOperandFunctionExpressionNode(
      NodeType.BeginsWith,
      this,
      wrapConst(value)
    );
  }

  public contains(
    value: Value | ConstantValueExpression<Value>
  ): LogicExpression {
    return new PathOperandFunctionExpressionNode(
      NodeType.Contains,
      this,
      wrapConst(value)
    );
  }

  public exists(): LogicExpression {
    return new PathFunctionExpressionNode(NodeType.AttributeExists, this);
  }

  public hasType(type: string | ValueExpression<string>): LogicExpression {
    return new PathOperandFunctionExpressionNode(
      NodeType.AttributeType,
      this,
      wrapConst(type)
    );
  }

  public notExists(): LogicExpression {
    return new PathFunctionExpressionNode(NodeType.AttributeNotExists, this);
  }

  public size(): ValueExpression<number> {
    return new SizeExpressionNode(this);
  }

  public override build(ctx: ExpressionContext<string[]>): string {
    return this.name.map((x) => ctx.addName(x)).join(".");
  }
}
