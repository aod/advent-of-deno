import { path } from "./deps.ts";
import { logger } from "./logger.ts";

export type Year = 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022;
// deno-fmt-ignore
export type Day =
  |  1 |  2 |  3 |  4 |  5
  |  6 |  7 |  8 |  9 | 10
  | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25;
export type Part = 1 | 2;

export type Solver = (input: string) => unknown;
export type Part1 = { part1: Solver };
export type Part2 = { part2: Solver };
export type Solution = Part1 & Part2;

export function input(year: Year, day: Day, suffix?: string) {
  const y = year;
  const d = ("" + day).padStart(2, "0");
  const s = suffix ?? "";
  const resolvedFileURL = import.meta.resolve(`../inputs/${y}/day${d}${s}.txt`);
  const inputPath = path.fromFileUrl(resolvedFileURL);
  logger().debug(`Reading input from ${inputPath}`)
  return Deno.readTextFileSync(inputPath);
}
