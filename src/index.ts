import { ExpressionBuilder } from "./nodes/ExpressionBuilder";
import { ExpressionDictionary } from "./nodes/ExpressionDictionary";

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

const ctx = new ExpressionDictionary(undefined, undefined, true);

const expr = ExpressionBuilder.build<Repo>(
  (b) =>
    b.and(
      b.field("id").between(1, 2),
      b.field("repository", "type").equals("git")
    ),
  ctx
);

console.log(
  JSON.stringify(
    {
      ctx,
      expr,
    },
    null,
    2
  )
);
