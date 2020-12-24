export interface Solver<Output = unknown> {
  part1(input: string): Output;
  part2(input: string): Output;
}

export type AocYear = 2015 | 2016 | 2017 | 2018 | 2019 | 2020;
export type AoCDay =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

export type DaySolutions = { [day in AoCDay]: Solver };
export type YearSolutions = { [year in AocYear]: DaySolutions };
