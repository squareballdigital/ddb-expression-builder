export type DeepKeyPaths<T> = {
  [P in keyof T]-?: P extends string
    ? T[P] extends object
      ? [P] | [P, ...DeepKeyPaths<T[P]>]
      : [P]
    : never;
}[keyof T];

export type DeepIndexType<T, P> = P extends [infer K]
  ? K extends keyof T
    ? T[K]
    : never
  : P extends [infer K, ...infer Rest]
  ? K extends keyof T
    ? DeepIndexType<T[K], Rest>
    : never
  : never;
