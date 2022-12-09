#!/usr/bin/env -S deno run --allow-read --allow-write

import { ensureFile, path } from "../deps.ts";

if (Deno.args.length < 2) {
  console.error("Please provide the year and day of the new solution");
  console.error("Example: ./src/bin/new 2022 4");
  Deno.exit(1);
}

const year = Deno.args[0];
const yearShort = year.slice(2);

const day = Deno.args[1];
const dayPadded = ("" + day).padStart(2, "0");

const solutionTemplate = `function part1(_input: string) {
  console.assert(false, "Part 1 is not implemented yet");
  return -1;
}

function part2(_input: string) {
  console.assert(false, "Part 2 is not implemented yet");
  return -1;
}

export default { part1, part2 };
`;

const testTemplate = `import { assertEquals } from "../deps.ts";
import { input } from "../aoc.ts";
import day${dayPadded} from "./day${dayPadded}.ts";

Deno.test("${yearShort}-${dayPadded}a-ex1", { ignore: true }, () => {
  assertEquals(day${dayPadded}.part1(input(${year}, ${day}, "-ex1")), -1);
});

Deno.test("${yearShort}-${dayPadded}a", { ignore: true }, () => {
  assertEquals(day${dayPadded}.part1(input(${year}, ${day})), -1);
});

Deno.test("${yearShort}-${dayPadded}b-ex1", { ignore: true }, () => {
  assertEquals(day${dayPadded}.part2(input(${year}, ${day}, "-ex1")), -1);
});

Deno.test("${yearShort}-${dayPadded}b", { ignore: true }, () => {
  assertEquals(day${dayPadded}.part2(input(${year}, ${day})), -1);
});
`;

const currentBinPath = path.fromFileUrl(import.meta.url);
const currentBinDir = path.dirname(currentBinPath);
const solutionDir = path.join(currentBinDir, `../${year}`);

const solutionPath = path.join(solutionDir, `day${dayPadded}.ts`);
await createFile(solutionPath, solutionTemplate);

const testPath = path.join(solutionDir, `day${dayPadded}_test.ts`);
await createFile(testPath, testTemplate);

async function createFile(filepath: string, contents: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(contents);
  await ensureFile(filepath);
  await Deno.writeFile(filepath, data);
}
