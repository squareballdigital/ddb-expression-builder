import { ExpressionDictionary } from "../util/ExpressionDictionary.js";
import { LogicExpressionBuilder } from "./LogicExpressionBuilder.js";

describe("LogicExpressionBuilder", () => {
  describe("build()", () => {
    it("outputs a less than expression properly", () => {
      const ctx = new ExpressionDictionary();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").lessThan(2)
      );

      expect(result).toEqual("#f0 < :f0");

      expect(ctx.toJSON()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("combines expressions with AND", () => {
      const ctx = new ExpressionDictionary();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.and(
          b.field("foo").lessThan(2),
          b.field("bar").lessOrEqual(3),
          b.field("baz").greaterOrEqual(4)
        )
      );

      expect(result).toEqual("#f0 < :f0 AND #f1 <= :f1 AND #f2 >= :f2");

      expect(ctx.toJSON()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
          "#f1": "bar",
          "#f2": "baz",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
          ":f1": 3,
          ":f2": 4,
        },
      });
    });

    it("combines expressions with AND and OR with brackets", () => {
      const ctx = new ExpressionDictionary();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.and(
          b.field("foo").lessThan(2),
          b.or(b.field("bar").lessOrEqual(3), b.field("baz").greaterThan(4)),
          b.field("bam").greaterOrEqual(5)
        )
      );

      expect(result).toEqual(
        "#f0 < :f0 AND (#f1 <= :f1 OR #f2 > :f2) AND #f3 >= :f3"
      );

      expect(ctx.toJSON()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
          "#f1": "bar",
          "#f2": "baz",
          "#f3": "bam",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
          ":f1": 3,
          ":f2": 4,
          ":f3": 5,
        },
      });
    });
  });
});
