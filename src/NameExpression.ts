import { AttributeExistsExpression } from "./AttributeExistsExpression.js";
import { AttributeNotExistsExpression } from "./AttributeNotExistsExpression.js";
import { AttributeTypeExpression } from "./AttributeTypeExpression.js";
import { BeginsWithExpression } from "./BeginsWithExpression.js";
import { BetweenExpression } from "./BetweenExpression.js";
import { ContainsExpression } from "./ContainsExpression.js";
import { DeepIndexType, DeepKeyPaths } from "./DeepKeyPaths.js";
import { NameNode } from "./NameNode.js";
import { SizeExpression } from "./SizeExpression.js";
import { ValueNodeLike } from "./ValueNodeLike.js";

export class NameExpression<T, N extends DeepKeyPaths<T>> extends NameNode<
  T,
  N
> {
  public beginsWith(
    value: ValueNodeLike<DeepIndexType<T, N>>
  ): BeginsWithExpression {
    return new BeginsWithExpression(this, this.makeValueNode(value));
  }

  public between(
    lower: ValueNodeLike<DeepIndexType<T, N>>,
    upper: ValueNodeLike<DeepIndexType<T, N>>
  ): BetweenExpression {
    return new BetweenExpression(
      this,
      this.makeValueNode(lower),
      this.makeValueNode(upper)
    );
  }

  public contains(
    value: ValueNodeLike<DeepIndexType<T, N>>
  ): ContainsExpression {
    return new ContainsExpression(this, this.makeValueNode(value));
  }

  public exists(): AttributeExistsExpression {
    return new AttributeExistsExpression(this);
  }

  public hasType(type: ValueNodeLike<string>): AttributeTypeExpression {
    return new AttributeTypeExpression(this, this.makeValueNode(type));
  }

  public notExists(): AttributeNotExistsExpression {
    return new AttributeNotExistsExpression(this);
  }

  public size(): SizeExpression {
    return new SizeExpression(this);
  }
}
