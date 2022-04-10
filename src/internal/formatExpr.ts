export function formatExpr(
  parts: string[],
  { separator = "", wrap = false }: { separator?: string; wrap?: boolean } = {}
): string {
  const str = parts.join(separator);
  return wrap ? `(${str})` : str;
}
