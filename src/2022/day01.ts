import { sum } from "../math.ts";

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
  return sum(...snacks);
}

function part1(input: string) {
  return Math.max(...parse(input).map(totalCalories));
}

function compareCalories(a: Calories, b: Calories) {
  return b - a;
}

function part2(input: string) {
  return sum(
    ...parse(input).map(totalCalories).sort(compareCalories).slice(0, 3),
  );
}

export default { part1, part2 };
