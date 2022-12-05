import { assertEquals } from "../../deps.ts";
import { input } from "../aoc.ts";
import day03 from "./day03.ts";

Deno.test("22-03a-ex1", () => {
  assertEquals(day03.part1(input(2022, 3, "-ex1")), 157);
});

Deno.test("22-03a", () => {
  assertEquals(day03.part1(input(2022, 3)), 8252);
});

Deno.test("22-03b-ex1", () => {
  assertEquals(day03.part2(input(2022, 3, "-ex1")), 70);
});

Deno.test("22-03b", () => {
  assertEquals(day03.part2(input(2022, 3)), 2828);
});
