import { ExpressionBuilder } from "./ExpressionBuilder.js";
import { UpdateExpressionBuilder } from "./UpdateExpressionBuilder.js";

describe("UpdateExpressionBuilder", () => {
  describe("build", () => {
    it("supports ADD", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").addTo(1),
      ]);

      expect(result).toEqual("ADD #f0 :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports DELETE", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").deleteFrom(1),
      ]);

      expect(result).toEqual("DELETE #f0 :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports REMOVE", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").remove(),
      ]);

      expect(result).toEqual("REMOVE #f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
      });
    });

    it("supports SET", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(1),
      ]);

      expect(result).toEqual("SET #f0 = :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports SET +", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(b.field("foo").add(1)),
      ]);

      expect(result).toEqual("SET #f0 = #f0 + :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports SET -", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(b.field("foo").subtract(1)),
      ]);

      expect(result).toEqual("SET #f0 = #f0 - :f0");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports SET list_append", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(b.field("foo").listAppend(1)),
      ]);

      expect(result).toEqual("SET #f0 = list_append(#f0, :f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("supports SET if_not_exists", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(b.field("foo").ifNotExists(1)),
      ]);

      expect(result).toEqual("SET #f0 = if_not_exists(#f0, :f0)");

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
        },
      });
    });

    it("combines multiple clauses", () => {
      const ctx = new ExpressionBuilder();

      const result = UpdateExpressionBuilder.build<any>(ctx, (b) => [
        b.field("foo").set(b.field("foo").ifNotExists(b.field("bar").add(1))),
        b.field("baz").addTo(2),
        b.field("bim").addTo(3),
        b.field("bom").remove(),
        b.field("bop").remove(),
        b.field("goo").set(b.field("goo").listAppend(4)),
        b.field("moo").deleteFrom(5),
      ]);

      expect(result).toEqual(
        "ADD #f2 :f1, #f3 :f2 DELETE #f7 :f4 REMOVE #f4, #f5 SET #f0 = if_not_exists(#f0, #f1 + :f0), #f6 = list_append(#f6, :f3)"
      );

      expect(ctx.attributes()).toEqual({
        ExpressionAttributeNames: {
          "#f0": "foo",
          "#f1": "bar",
          "#f2": "baz",
          "#f3": "bim",
          "#f4": "bom",
          "#f5": "bop",
          "#f6": "goo",
          "#f7": "moo",
        },
        ExpressionAttributeValues: {
          ":f0": 1,
          ":f1": 2,
          ":f2": 3,
          ":f3": 4,
          ":f4": 5,
        },
      });
    });
  });
});
