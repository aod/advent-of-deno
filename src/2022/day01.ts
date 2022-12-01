type Calories = number;
type Snack = Calories;
type Snacks = Snack[];
type ElfInventory = Snacks;

function parse(input: string): ElfInventory[] {
  return input.split("\n\n").map((inventory) =>
    inventory.split("\n").map(Number)
  );
}

function totalCalories(snacks: Snacks): Calories {
  return snacks.reduce((previous, current) => previous + current, 0);
}

function part1(input: string) {
  return Math.max(...parse(input).map(totalCalories));
}

export default { part1 };
