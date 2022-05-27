# @squareball/ddb-expression-builder

Use this package to build **type-safe** expressions for DynamoDB!

## Example

```typescript
import { ExpressionBuilder } from "@squareball/ddb-expression-builder";

const repo = {
  id: 42,
  name: "myrepo",
  description: "a cool repository",
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

const builder = new ExpressionBuilder<Repo>();

const updateCommand = {
  ConditionExpression: builder.conditionExpression((b) =>
    b.and(
      // note that the keys here are constrained to the keys of `Repo`
      // and the type for the parameter of `equals` is also correct
      b.field("repository", "type").equals("git"),
      b.field("id").exists()
    )
  ),
  UpdateExpression: builder.updateExpression((b) => [
    b.field("name").set("myotherrepo"),
    b.field("description").remove(),
  ]),
  ...builder.attributes(),
};

console.log(updateCommand);
```

This will output:

```js
{
  ConditionExpression: '#f0.#f1 = :f0 AND attribute_exists(#f2)',
  UpdateExpression: 'REMOVE #f4 SET #f3 = :f1',
  ExpressionAttributeNames: {
    '#f0': 'repository',
    '#f1': 'type',
    '#f2': 'id',
    '#f3': 'name',
    '#f4': 'description'
  },
  ExpressionAttributeValues: {
    ':f0': 'git',
    ':f1': 'myotherrepo'
  }
}
```
