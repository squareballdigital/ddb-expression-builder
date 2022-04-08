import { ExpressionBuilder } from "./nodes/ExpressionBuilder.js";
import { ExpressionDictionary } from "./nodes/ExpressionDictionary.js";

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

const ctx = new ExpressionDictionary();

const expr = ExpressionBuilder.build<Repo>(
  (b) =>
    b.and(
      b.field("id").between(1, 2),
      b.field("repository", "type").equals("git")
    ),
  ctx
);

console.log({
  ctx,
  expr,
});
