export function* windows<T>(
  iterable: Iterable<T>,
  size: number,
): Generator<T[]> {
  let tmp: T[] = [];
  for (const value of iterable) {
    tmp.push(value);
    if (tmp.length === size) {
      yield tmp;
      tmp = [];
    }
  }
}
