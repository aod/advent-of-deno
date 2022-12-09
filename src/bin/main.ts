#!/usr/bin/env -S deno run --allow-read --allow-hrtime

import { Day, Year } from "../aoc.ts";
import { getErrorMessage } from "../catch.ts";

const args = Deno.args;

// deno-fmt-ignore
if (args.length < 2) {
  console.error(`advent-of-deno: missing required program arguments, both year and day need to be specified`)
  console.error(``)
  console.error(`Usage: advent-of-deno <year> <day> [input-file-path]`)
  console.error(`  <year>            : Valid Advent of Code year e.g., 2022.`)
  console.error(`  <day>             : Valid Advent of Code day e.g., 3.`)
  console.error(`  [input-file-path] : Path to the input file, read from stdin if omitted.`)
  console.error(``)
  console.error(`Example:`)
  console.error(`  src/main.ts 2022 3 inputs/2022/day03.txt`)
  Deno.exit(1)
}

const [year, day] = args.slice(0, 2).map(Number) as [Year, Day];

const path = import.meta.resolve(
  `../${year}/day${("" + day).padStart(2, "0")}.ts`,
);
const { default: solution } = await import(path).catch(() => {
  console.error(`advent-of-deno: couldn't import ${path}`);
  Deno.exit(1);
});

const inputContents: string = (() => {
  try {
    if (args.length <= 2) {
      console.log("reading from stdin:");
      return new TextDecoder().decode(Deno.readAllSync(Deno.stdin)).trim();
    }
    return Deno.readTextFileSync(args[2]);
  } catch (e: unknown) {
    const errorMsg = getErrorMessage(e);
    console.error(`advent-of-deno: couldn't read ${args[2]}: ${errorMsg}`);
    Deno.exit(1);
  }
})();

console.log(`[AOC ${year}/${day}]`);
[solution.part1, solution.part2].forEach((solve, i) => {
  const input = inputContents.slice();
  const t0 = performance.now();
  const ans = solve(input);
  const ms = (performance.now() - t0).toFixed(3);
  console.log(`Part${i + 1}(${ms}ms):\n${ans}`);
});
