import { chunk } from "https://deno.land/std@0.167.0/collections/chunk.ts";
import { intersect } from "https://deno.land/std@0.167.0/collections/intersect.ts";
import { sumOf } from "https://deno.land/std@0.167.0/collections/sum_of.ts";

import { Character } from "../string.ts";

type Item = Character;
type Items = Character[];

type LargeCompartment = Item[];

interface Rugsack {
  items: Items;
  compartments(): [LargeCompartment, LargeCompartment];
}

function parse(input: string): Rugsack[] {
  return input.split("\n").map(intoRugsack);
}

function intoRugsack(line: string): Rugsack {
  return {
    items: line.split("") as Items,
    compartments() {
      const middle = Math.floor(this.items.length / 2);
      return [
        this.items.slice(0, middle),
        this.items.slice(middle),
      ];
    },
  };
}

function priority(item: string) {
  const code = item.charCodeAt(0);
  // "A" 65
  if (code < 97) return 27 + code - 65;
  // "a" 97
  return code - 96;
}

function part1(input: string) {
  const rugsacks = parse(input);
  const commonItems = rugsacks.map((rugsack) =>
    intersect(...rugsack.compartments())
  );
  const priorities = commonItems.flatMap((items) => [...items].map(priority));
  return sumOf(priorities, (i) => i);
}

function findBadge(group: Rugsack[]): Item {
  const badge = intersect(...group.map((rugsack) => rugsack.items));
  return badge.values().next().value;
}

function part2(input: string) {
  const GROUP_SIZE = 3;
  return sumOf(
    chunk(parse(input), GROUP_SIZE)
      .flatMap(findBadge)
      .map(priority),
    (i) => i,
  );
}

export default { part1, part2 };
