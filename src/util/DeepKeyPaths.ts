type Next10 = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type DeepKeyPaths<T, Depth extends number = 10> = {
  done: string[];
  recurse: {
    [P in keyof T]-?: P extends string
      ? T[P] extends object
        ? [P] | [P, ...DeepKeyPaths<T[P], Next10[Depth]>]
        : [P]
      : never;
  }[keyof T];
}[Depth extends -1 ? "done" : "recurse"];

export type DeepIndexType<T, P, Depth extends number = 10> = {
  done: any;
  recurse: P extends [infer K]
    ? K extends keyof T
      ? T[K]
      : never
    : P extends [infer K, ...infer Rest]
    ? K extends keyof T
      ? DeepIndexType<T[K], Rest, Next10[Depth]>
      : never
    : never;
}[Depth extends -1 ? "done" : "recurse"];
