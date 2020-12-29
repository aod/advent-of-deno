import { assertEquals } from "../../deps.ts";
import { input } from "../aoc.ts";
import day24 from "./day24.ts";

Deno.test("20-24a-ex1", () => {
  assertEquals(day24.part1(input(2020, 24, "-ex1")), 10);
});

Deno.test("20-24a", () => {
  assertEquals(day24.part1(input(2020, 24)), 469);
});

Deno.test("20-24b-ex1", () => {
  assertEquals(day24.part2(input(2020, 24, "-ex1")), 2208);
});

Deno.test("20-24b", () => {
  assertEquals(day24.part2(input(2020, 24)), 4353);
});
