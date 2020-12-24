import { assertEquals } from "../../deps.ts";
import day23 from "./day23.ts";

Deno.test("2020-12-23/1", () => {
  assertEquals(
    day23.part1(Deno.readTextFileSync("inputs/2020/day23.txt")),
    "24798635",
  );
});

Deno.test("2020-12-23/2", () => {
  assertEquals(
    day23.part2(Deno.readTextFileSync("inputs/2020/day23.txt")),
    12757828710,
  );
});
