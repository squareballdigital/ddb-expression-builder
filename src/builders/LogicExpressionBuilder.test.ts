import { ExpressionBuilder } from "./ExpressionBuilder.js";
import { LogicExpressionBuilder } from "./LogicExpressionBuilder.js";

describe("LogicExpressionBuilder", () => {
  describe("build()", () => {
    it("supports <", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").lessThan(2)
      );

      expect(result).toEqual("#f0 < :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports <=", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").lessOrEqual(2)
      );

      expect(result).toEqual("#f0 <= :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports =", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").equals(2)
      );

      expect(result).toEqual("#f0 = :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports <>", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").notEqual(2)
      );

      expect(result).toEqual("#f0 <> :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports >=", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").greaterOrEqual(2)
      );

      expect(result).toEqual("#f0 >= :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports >", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").greaterThan(2)
      );

      expect(result).toEqual("#f0 > :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports attribute_exists()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").exists()
      );

      expect(result).toEqual("attribute_exists(#f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
      });
    });

    it("supports attribute_not_exists()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").notExists()
      );

      expect(result).toEqual("attribute_not_exists(#f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
      });
    });

    it("supports attribute_type()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").hasType("S")
      );

      expect(result).toEqual("attribute_type(#f0, :f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": "S",
        },
      });
    });

    it("supports begins_with()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").beginsWith("bar")
      );

      expect(result).toEqual("begins_with(#f0, :f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": "bar",
        },
      });
    });

    it("supports contains()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").contains("bar")
      );

      expect(result).toEqual("contains(#f0, :f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": "bar",
        },
      });
    });

    it("supports size()", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").size().equals(0)
      );

      expect(result).toEqual("size(#f0) = :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 0,
        },
      });
    });

    it("supports BETWEEN", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").between(1, 2)
      );

      expect(result).toEqual("#f0 BETWEEN :f0 AND :f1");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
          ":f1": 2,
        },
      });
    });

    it("supports IN", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.field("foo").in(1, 2, 3)
      );

      expect(result).toEqual("#f0 IN (:f0, :f1, :f2)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
          ":f1": 2,
          ":f2": 3,
        },
      });
    });

    it("supports AND", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.and(
          b.field("foo").lessThan(2),
          b.field("bar").lessOrEqual(3),
          b.field("baz").greaterOrEqual(4)
        )
      );

      expect(result).toEqual("#f0 < :f0 AND #f1 <= :f1 AND #f2 >= :f2");

      expect(ctx.attributes()).toEqual({
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

    it("supports NOT", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.not(b.field("foo").lessThan(2))
      );

      expect(result).toEqual("NOT #f0 < :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
        },
      });
    });

    it("supports OR", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.or(
          b.field("foo").lessThan(2),
          b.field("bar").lessOrEqual(3),
          b.field("baz").greaterOrEqual(4)
        )
      );

      expect(result).toEqual("#f0 < :f0 OR #f1 <= :f1 OR #f2 >= :f2");

      expect(ctx.attributes()).toEqual({
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

    it("uses brackets for correct precedence", () => {
      const ctx = new ExpressionBuilder();

      const result = LogicExpressionBuilder.build<any>(ctx, (b) =>
        b.and(
          b.field("foo").lessThan(2),
          b.or(b.field("bar").lessOrEqual(3), b.field("baz").greaterThan(4)),
          b.not(
            b.and(b.field("bam").greaterOrEqual(5), b.field("bom").equals(6))
          )
        )
      );

      expect(result).toEqual(
        "#f0 < :f0 AND (#f1 <= :f1 OR #f2 > :f2) AND NOT (#f3 >= :f3 AND #f4 = :f4)"
      );

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
          "#f1": "bar",
          "#f2": "baz",
          "#f3": "bam",
          "#f4": "bom",
        },
        ExpressionAttributeValues: {
          ":f0": 2,
          ":f1": 3,
          ":f2": 4,
          ":f3": 5,
          ":f4": 6,
        },
      });
    });
  });
});
