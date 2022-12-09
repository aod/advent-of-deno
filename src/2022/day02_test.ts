import { assertEquals } from "../deps.ts";
import { input } from "../aoc.ts";
import day02 from "./day02.ts";

Deno.test("22-02a-ex1", () => {
  assertEquals(day02.part1(input(2022, 2, "-ex1")), 15);
});

Deno.test("22-02a", () => {
  assertEquals(day02.part1(input(2022, 2)), 12772);
});

Deno.test("22-02b-ex1", () => {
  assertEquals(day02.part2(input(2022, 2, "-ex1")), 12);
});

Deno.test("22-02b", () => {
  assertEquals(day02.part2(input(2022, 2)), 11618);
});
