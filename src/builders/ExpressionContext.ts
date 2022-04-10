export interface ExpressionContext<N extends string[] = string[]> {
  addName(...name: N): string;
  addValue(value: unknown): string;
}
