export function sum(...arr: number[]): number {
  return arr.reduce((previous, current) => previous + current, 0);
}
