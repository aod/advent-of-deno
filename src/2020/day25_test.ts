import { assertEquals } from "../../deps.ts";
import { input } from "../aoc.ts";
import day25 from "./day25.ts";

Deno.test("20-25a-ex1", () => {
  assertEquals(day25.part1(input(2020, 25, "-ex1")), 14897079);
});

Deno.test("20-25a", () => {
  assertEquals(day25.part1(input(2020, 25)), 4441893);
});
