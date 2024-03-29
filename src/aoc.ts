export interface Solver {
  part1(input: string): unknown;
  part2(input: string): unknown;
}

export type Year = 2015 | 2016 | 2017 | 2018 | 2019 | 2020;
// deno-fmt-ignore
export type Day =
  |  1 |  2 |  3 |  4 |  5
  |  6 |  7 |  8 |  9 | 10
  | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25;

export type DaySolutions = Record<Day, Solver>;
export type YearSolutions = Record<Year, DaySolutions>;

export function input(year: Year, day: Day, suffix?: string) {
  return Deno.readTextFileSync(`inputs/${year}/day${day}${suffix || ""}.txt`);
}
