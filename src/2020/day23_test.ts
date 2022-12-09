import { assertEquals } from "../deps.ts";
import { input } from "../aoc.ts";
import day23 from "./day23.ts";

Deno.test("20-23a-ex1", () => {
  assertEquals(day23.part1(input(2020, 23, "-ex1")), "67384529");
});

Deno.test("20-23a", () => {
  assertEquals(day23.part1(input(2020, 23)), "24798635");
});

Deno.test("20-23b-ex1", () => {
  assertEquals(day23.part2(input(2020, 23, "-ex1")), 149245887792);
});

Deno.test("20-23b", () => {
  assertEquals(day23.part2(input(2020, 23)), 12757828710);
});
