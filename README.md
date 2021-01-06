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

```console
$ deno run --allow-read --allow-hrtime src/main.ts <year> <day> [input-file-path]
```

(Omit the last argument to read the puzzle input from stdin.)

Example:

```console
$ deno run --allow-read --allow-hrtime src/main.ts 2020 23 inputs/2020/day23.txt
Part1(0.264ms): 24798635
Part2(2487.216ms): 12757828710
```

Replace `src/main.ts` with `https://raw.githubusercontent.com/aod/advent-of-deno/main/src/main.ts`
to run a solution without having to clone the repo.

The equivalent command of the example above without cloning the repo would be:

```console
$ curl -s https://raw.githubusercontent.com/aod/advent-of-deno/main/inputs/2020/day23.txt \
  | deno run --allow-read --allow-hrtime \
      https://raw.githubusercontent.com/aod/advent-of-deno/main/src/main.ts \
      2020 23
```
