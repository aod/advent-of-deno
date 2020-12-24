import { assertEquals } from "../../deps.ts";
import day24 from "./day24.ts";

Deno.test("2020-12-24/1", () => {
  assertEquals(
    day24.part1(Deno.readTextFileSync("inputs/2020/day24.txt")),
    469,
  );
});

Deno.test("2020-12-24/2", () => {
  assertEquals(
    day24.part2(Deno.readTextFileSync("inputs/2020/day24.txt")),
    4353,
  );
});
