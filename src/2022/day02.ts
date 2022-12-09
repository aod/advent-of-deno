import { sumOf } from "https://deno.land/std@0.167.0/collections/sum_of.ts";

const LOSE = 0;
const DRAW = 3;
const WIN = 6;
const R = 1;
const P = 2;
const S = 3;

const points: Record<string, number> = {
  "A X": R + DRAW,
  "A Y": P + WIN,
  "A Z": S + LOSE,

  "B X": R + LOSE,
  "B Y": P + DRAW,
  "B Z": S + WIN,

  "C X": R + WIN,
  "C Y": P + LOSE,
  "C Z": S + DRAW,
};

function part1(input: string) {
  return sumOf(input.split("\n").map((line) => points[line]), (i) => i);
}

const choose: Record<string, string> = {
  "A X": "A Z",
  "A Y": "A X",
  "A Z": "A Y",

  "B X": "B X",
  "B Y": "B Y",
  "B Z": "B Z",

  "C X": "C Y",
  "C Y": "C Z",
  "C Z": "C X",
};

function part2(input: string) {
  return sumOf(input.split("\n").map((line) => points[choose[line]]), (i) => i);
}

export default { part1, part2 };
