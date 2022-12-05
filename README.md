# advent-of-deno 🦕

[Advent of Code](https://adventofcode.com/)
solutions in
[TypeScript](https://www.typescriptlang.org/)
+
[Deno](https://deno.land/)

## Quick start

### 1. Install Deno

Install [Deno](https://deno.land/#installation) and make sure `deno` is available in your path.

### 2. Run a solution

Synopsis:

```
src/main.ts <year> <day> [input-file-path]
```

_Run the main file without arguments to see the full usage description._

---

Simple example:

```
./src/main.ts 2022 3 inputs/2022/day03.txt
```

Output:

```
[AOC 2022/3]
Part1(2.484ms):
8252
Part2(0.896ms):
2828
```

---

A more secure and verbose example:

```
deno run --allow-read=inputs/,src/ --allow-hrtime src/main.ts 2022 3 inputs/2022/day03.txt
```

#### 2.1 Without cloning the repo

Replace `src/main.ts` with `https://raw.githubusercontent.com/aod/advent-of-deno/main/src/main.ts`
to run a solution without having to clone the repo.

The equivalent command of the example above without cloning the repo would be:

```
curl -s \
    https://raw.githubusercontent.com/aod/advent-of-deno/main/inputs/2020/day23.txt \
| deno run --allow-hrtime \
    https://raw.githubusercontent.com/aod/advent-of-deno/main/src/main.ts \
    2020 \
    23
```
