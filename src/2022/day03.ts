import { windows } from "../iter.ts";
import { sum } from "../math.ts";
import { intersection } from "../set.ts";
import { Character } from "../string.ts";

type Item = Character;
type Items = Character[];

type LargeCompartment = Set<Item>;

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
        new Set(this.items.slice(0, middle)),
        new Set(this.items.slice(middle)),
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
    intersection(...rugsack.compartments())
  );
  const priorities = commonItems.flatMap((items) => [...items].map(priority));
  return sum(...priorities);
}

function findBadge(group: Rugsack[]): Item {
  const badge = intersection(...group.map((rugsack) => new Set(rugsack.items)));
  return badge.values().next().value;
}

function part2(input: string) {
  const GROUP_SIZE = 3;
  return sum(
    ...[...windows(parse(input), GROUP_SIZE)]
      .map(findBadge)
      .map(priority),
  );
}

export default { part1, part2 };
