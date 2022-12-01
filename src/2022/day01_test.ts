import { assertEquals } from "../../deps.ts";
import { input } from "../aoc.ts";
import day01 from "./day01.ts";

Deno.test("22-01a-ex1", () => {
  assertEquals(day01.part1(input(2022, 1, "-ex1")), 24000);
});

Deno.test("22-01a", () => {
  assertEquals(day01.part1(input(2022, 1)), 69528);
});

Deno.test("22-01b-ex1", () => {
  assertEquals(day01.part2(input(2022, 1, "-ex1")), 45000);
});

Deno.test("22-01b", () => {
  assertEquals(day01.part2(input(2022, 1)), 206152);
});
