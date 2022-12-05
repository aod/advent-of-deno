import { sum } from "../math.ts";

type Item = string;
type LargeCompartment = Set<Item>;

type Rugsack = [LargeCompartment, LargeCompartment];

function parse(input: string): Rugsack[] {
  return input.split("\n").map(intoRugsack);
}

function intoRugsack(line: string): Rugsack {
  const middle = Math.floor(line.length / 2);
  return [new Set(line.slice(0, middle)), new Set(line.slice(middle))];
}

function intersection<T>(set1: Set<T>, set2: Set<T>) {
  const result = new Set<T>();
  for (const value1 of set1) {
    if (set2.has(value1)) {
      result.add(value1);
    }
  }
  return result;
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
  const commonItems = rugsacks.map((rugsack) => intersection(...rugsack));
  const priorities = commonItems.flatMap((items) => [...items].map(priority));
  return sum(...priorities);
}

function part2(_input: string) {
  return -1;
}

export default { part1, part2 };
