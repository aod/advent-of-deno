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

function part2(input: string) {
  const GROUP_SIZE = 3;
  const rugsacks = parse(input);
  let result = 0
  for (let i = 0; i <= rugsacks.length - GROUP_SIZE; i += GROUP_SIZE) {
    const group = rugsacks.slice(i, i + GROUP_SIZE).map((rugsack) => new Set(rugsack.items))
    const badges = intersection(...group);
    const priorities = [...badges].map(priority)
    result += sum(...priorities)
  }
  return result
}

export default { part1, part2 };
