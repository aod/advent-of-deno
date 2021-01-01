import { assertEquals } from "../../deps.ts";
import { input } from "../aoc.ts";
import day22 from "./day22.ts";

Deno.test("20-22a-ex1", () => {
  assertEquals(day22.part1(input(2020, 22, "-ex1")), 306);
});

Deno.test("20-22a", () => {
  assertEquals(day22.part1(input(2020, 22)), 33010);
});

Deno.test("20-22b-ex1", () => {
  assertEquals(day22.part2(input(2020, 22, "-ex1")), 291);
});

Deno.test("20-22b", () => {
  assertEquals(day22.part2(input(2020, 22)), 32769);
});
