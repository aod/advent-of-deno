#!/usr/bin/env -S deno run --allow-read --allow-write --allow-hrtime --allow-net=deno.land

import { Day, input, Part, Solver, Year } from "../aoc.ts";
import { getErrorMessage } from "../catch.ts";
import { flags, log, path, readAll } from "../deps.ts";
import { logger, NoopLogger } from "../logger.ts";

if (import.meta.main) {
  const args = flags.parse(Deno.args, {
    boolean: ["input-stdin", "v", "help", "file-logging"],
    string: ["input-file"],
    alias: {
      "verbose": "v",
      "h": "help",
    },
    default: {
      "v": false,
      "input-stdin": false,
      help: false,
      "file-logging": false,
    },
  });

  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: ({ levelName, msg, datetime }) => {
          const formatter = Intl.DateTimeFormat("en-us", {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            fractionalSecondDigits: 3,
            hour12: false,
          });
          const time = formatter.format(datetime);
          return `[${time}][${levelName}] ${msg}`;
        },
      }),
      file: args["file-logging"]
        ? new log.handlers.FileHandler("NOTSET", {
          filename: path.fromFileUrl(import.meta.resolve("../../log.txt")),
          formatter: ({ levelName, msg, datetime }) =>
            `[${datetime.toISOString()}][${levelName}] ${msg}`,
        })
        : new NoopLogger(),
    },
    loggers: {
      "advent-of-deno": {
        level: args.v ? "DEBUG" : "INFO",
        handlers: ["console", "file"],
      },
    },
  });

  logger().debug(`Arguments: ${JSON.stringify(args, null, 2)}`);

  if (args.help) {
    logger().info(`Usage: ${synopsis()}`);
    Deno.exit(0);
  } else if (args._.length < 2) {
    logger().error(
      "Missing required arguments, both year and day need to be specified.",
    );
    logger().error(`Usage: ${synopsis()}`);
    Deno.exit(1);
  }

  try {
    const [year, day] = args._.slice(0, 2).map(Number) as [Year, Day];
    logger().info(`AOC ${year}/${day}`);

    const importPath = solutionSrcPath(year, day);
    logger().debug(`Importing solution: ${importPath}`);
    const { default: solution } = await import(importPath);

    let solutionInput: string;
    if (args["input-stdin"]) {
      logger().debug("Reading input from stdin");
      const buf = await readAll(Deno.stdin);
      solutionInput = new TextDecoder().decode(buf).trim();
    } else if (args["input-file"]) {
      solutionInput = await Deno.readTextFile(args["input-file"]);
    } else {
      solutionInput = input(year, day);
    }

    logger().debug(`Running solution`);
    const part1Result = timeSolver(solution.part1, solutionInput);
    displayAnswer(1, part1Result[1], part1Result[0]);
    const part2Result = timeSolver(solution.part2, solutionInput);
    displayAnswer(2, part2Result[1], part2Result[0]);
  } catch (e) {
    logger().error(`Something went wrong: ${getErrorMessage(e)}`);
    Deno.exit(1);
  }
}

function synopsis() {
  return "src/bin/main.ts [--input-file <filepath> | --input-stdin] [--file-logging] <year> <day>";
}

function displayAnswer(part: Part, ms: number, answer: unknown) {
  logger().info(`Ran part ${part} in ${ms.toFixed(3)}ms:`);
  logger().info("" + answer);
}

function time<T>(fn: () => T) {
  const t0 = performance.now();
  const output = fn();
  const ms = performance.now() - t0;
  return [output, ms] as const;
}

function timeSolver(solve: Solver, input: string) {
  return time(() => solve(input));
}

function solutionSrcPath(year: Year, day: Day) {
  return import.meta.resolve(
    `../${year}/day${("" + day).padStart(2, "0")}.ts`,
  );
}
