import { assertEquals } from "../deps.ts";
import { windows } from "./iter.ts";

Deno.test("iter:windows works", () => {
  const got = [...windows([1, 2, 3, 4, 5, 6], 2)];
  const expected = [[1, 2], [3, 4], [5, 6]];
  assertEquals(got, expected);
});

Deno.test("iter:windows leftovers array", () => {
  const got = [...windows([1, 2, 3, 4, 5, 6, 7], 2)];
  const expected = [[1, 2], [3, 4], [5, 6]];
  assertEquals(got, expected);
});
