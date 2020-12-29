import AoC2020Solutions from "./2020/mod.ts";
import { Day, Year, YearSolutions } from "./aoc.ts";

const solutions = <YearSolutions> {
  2020: AoC2020Solutions,
};

const args = Deno.args;
const [year, day] = args.slice(0, 2).map(Number) as [Year, Day];
const inputFilePath = args[2];

const solution = solutions[year][day];
const inputContents = Deno.readTextFileSync(inputFilePath);

[solution.part1, solution.part2].forEach((solve, i) => {
  const input = inputContents.slice();
  const t0 = performance.now();
  const ans = solve(input);
  const ms = (performance.now() - t0).toFixed(3);
  console.log(`Part${i + 1}(${ms}ms):\n${ans}`);
});
