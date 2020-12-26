import { assertEquals } from "../../deps.ts";
import day25 from "./day25.ts";

Deno.test("2020-12-25/1", () => {
  assertEquals(
    day25.part1(Deno.readTextFileSync("inputs/2020/day25.txt")),
    4441893,
  );
});
