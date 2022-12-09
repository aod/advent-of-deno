import { sumOf } from "../deps.ts"

type Calories = number;
type Snack = Calories;
type Snacks = Snack[];
type ElfInventory = Snacks;
type ElfInventories = ElfInventory[];

function parse(input: string): ElfInventories {
  return input.split("\n\n").map((inventory) =>
    inventory.split("\n").map(Number)
  );
}

function totalCalories(snacks: Snacks): Calories {
  return sumOf(snacks, (i) => i);
}

function part1(input: string) {
  return Math.max(...parse(input).map(totalCalories));
}

function compareCalories(a: Calories, b: Calories) {
  return b - a;
}

function part2(input: string) {
  return sumOf(
    parse(input).map(totalCalories).sort(compareCalories).slice(0, 3),
    (i) => i,
  );
}

export default { part1, part2 };
