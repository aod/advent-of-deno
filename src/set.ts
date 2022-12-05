export function intersection<T>(
  ...sets: Set<T>[]
): Set<T> {
  if (!sets.length) {
    return new Set();
  } else if (sets.length === 1) {
    return sets[0];
  }

  const result = sets[0];
  for (const value of result) {
    for (let i = 1; i <= sets.length - 1; i++) {
      if (!sets[i].has(value)) {
        result.delete(value);
        break;
      }
    }
  }
  return result;
}
