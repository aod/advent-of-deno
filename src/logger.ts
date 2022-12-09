import { BaseHandler, log } from "./deps.ts";

export function logger() {
  return log.getLogger("advent-of-deno");
}

export class NoopLogger extends BaseHandler {
  constructor() {
    super("NOTSET")
  }
}
