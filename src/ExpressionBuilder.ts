import { AndExpression } from "./AndExpression.js";
import { DeepKeyPaths } from "./DeepKeyPaths.js";
import { ExpressionNode } from "./ExpressionNode.js";
import {
  LogicExpression,
  LogicExpressionConstructor,
} from "./LogicExpression.js";
import { NameExpression } from "./NameExpression.js";
import { NotExpression } from "./NotExpression.js";
import { OrExpression } from "./OrExpression.js";
import { ValueNode } from "./ValueNode.js";

export class ExpressionBuilder<T> {
  public static build<T>(
    builder: (b: ExpressionBuilder<T>) => ExpressionNode
  ): void {
    void builder;
  }

  public field<N extends DeepKeyPaths<T>>(...path: N): NameExpression<T, N> {
    return new NameExpression(...path);
  }

  public value<V>(value: V): ValueNode<V> {
    return new ValueNode(value);
  }

  public and(...terms: LogicExpression[]): LogicExpression {
    return this.buildTerms(AndExpression, terms);
  }

  public not(operand: LogicExpression): LogicExpression {
    return new NotExpression(operand);
  }

  public or(...terms: LogicExpression[]): LogicExpression {
    return this.buildTerms(OrExpression, terms);
  }

  private buildTerms(
    type: LogicExpressionConstructor,
    terms: LogicExpression[]
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
}

const repo = {
  id: 42,
  name: "myrepo",
  author: {
    name: "gordon",
    email: "gordon@example.com",
  },
  repository: {
    type: "git",
    url: "https://github.com/",
  },
};

type Repo = typeof repo;

ExpressionBuilder.build<Repo>((b) =>
  b.and(
    b.field("id").between(1, 2),
    b.field("repository", "type").equals("git")
  )
);
