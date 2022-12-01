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

```
deno run --allow-read=inputs/ --allow-hrtime src/main.ts <year> <day> [input-file-path]
```

_(Omit the last argument to read the puzzle input from stdin.)_

Example:

```
deno run --allow-read=inputs/ --allow-hrtime src/main.ts 2020 23 inputs/2020/day23.txt
```

Example output:

```
Part1(0.264ms): 24798635
Part2(2487.216ms): 12757828710
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
