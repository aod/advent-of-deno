import AoC2020Solutions from "./2020/mod.ts";
import { AoCDay, AocYear, YearSolutions } from "./lib.ts";

const solutions = <YearSolutions> {
  2020: AoC2020Solutions,
};

const args = Deno.args;
const [year, day] = args.slice(0, 2).map(Number);

const inputFilePath = args[2];
const inputContents = Deno.readTextFileSync(inputFilePath);

const solution = solutions[year as AocYear][day as AoCDay];

{
  const t0 = performance.now();
  const ans = solution.part1(inputContents);
  const t1 = performance.now();
  console.log(`Part1(${(t1 - t0).toFixed(3)}ms): ${ans}`);
}

{
  const t0 = performance.now();
  const ans = solution.part2(inputContents);
  const t1 = performance.now();
  console.log(`Part2(${(t1 - t0).toFixed(3)}ms): ${ans}`);
}
