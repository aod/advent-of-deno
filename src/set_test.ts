import { assertEquals } from "../deps.ts";
import { intersection } from "./set.ts";

Deno.test("working set intersection", () => {
  const a = new Set([1, 2, 3, 4, 5]);
  const b = new Set([1, 2, 3]);
  assertEquals(intersection(a, b), new Set([1, 2, 3]));
});

Deno.test("working 3 set intersection", () => {
  const a = new Set("vJrwpWtwJgWrhcsFMMfFFhFp");
  const b = new Set("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL");
  const c = new Set("PmmdzqPrVvPwwTWBwg");
  assertEquals(intersection(a, b, c), new Set(["r"]));
});
