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
src/bin/main.ts [--input-file <filepath> | --input-stdin] [--file-logging] <year> <day>
```

---

Example:

```
src/bin/main.ts 2022 3
```

Output:

```
[18:42:27.958][INFO] AOC 2022/3
[18:42:27.975][INFO] Ran part 1 in 1.777ms:
[18:42:27.976][INFO] 8252
[18:42:27.978][INFO] Ran part 2 in 2.011ms:
[18:42:27.978][INFO] 2828
```

---

A more secure but also verbose example would be:

```
deno run --allow-read=inputs/,src/ --allow-hrtime src/bin/main.ts 2022 3
```

#### 2.1 Without cloning the repo

Replace `src/bin/main.ts` with `https://raw.githubusercontent.com/aod/advent-of-deno/main/src/bin/main.ts`
to run a solution without having to clone the repo.

The equivalent command of the example above without cloning the repo would be:

```
curl -s \
    https://raw.githubusercontent.com/aod/advent-of-deno/main/inputs/2020/day23.txt \
| deno run --allow-hrtime --allow-net=raw.githubusercontent.com,deno.land \
    https://raw.githubusercontent.com/aod/advent-of-deno/main/src/bin/main.ts --input-stdin \
    2020 \
    23
```
