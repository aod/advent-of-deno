type Direction = "e" | "se" | "sw" | "w" | "nw" | "ne";

type Point = {
  x: number;
  y: number;
  z: number;
};

// deno-fmt-ignore
const POINT_DELTAS: { [key in Direction]: Point } = {
  "e":  { x:  1, y: -1, z:  0 },
  "se": { x:  0, y: -1, z:  1 },
  "sw": { x: -1, y:  0, z:  1 },
  "w":  { x: -1, y:  1, z:  0 },
  "nw": { x:  0, y:  1, z: -1 },
  "ne": { x:  1, y:  0, z: -1 },
};

function parse(input: string): Direction[][] {
  return input.split("\n")
    .map((lines) => [...lines.matchAll(/[sn]?[we]/g)])
    .map((matches) => matches.map((result) => result[0] as Direction));
}

function addCoord(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function nborPoints(coord: Point): Point[] {
  return [...Object.values(POINT_DELTAS)].map(addCoord.bind(null, coord));
}

function hashPoint({ x, y, z }: Point) {
  return (x << 16) + (y << 8) + z;
}

type BlackTiles = { [key: number]: Point };

function blackNbors(tileFloor: BlackTiles, coord: Point): number {
  return nborPoints(coord)
    .map(hashPoint)
    .filter((pointHash) => pointHash in tileFloor)
    .length;
}

function flipTiles(lines: Direction[][]): BlackTiles {
  const blackTiles: BlackTiles = {};

  for (const steps of lines) {
    const coord = steps
      .map((step) => POINT_DELTAS[step])
      .reduce(addCoord);

    const coordHash = hashPoint(coord);
    if (coordHash in blackTiles) {
      delete blackTiles[coordHash];
    } else {
      blackTiles[coordHash] = coord;
    }
  }

  return blackTiles;
}

function simulateDay(blackTiles: BlackTiles, n: number): BlackTiles {
  if (n === 0) {
    return blackTiles;
  }

  const next: BlackTiles = {};
  const candidates = [...Object.values(blackTiles)]
    .flatMap((blackTile) => [blackTile, ...nborPoints(blackTile)]);

  for (const candidate of candidates) {
    const nbors = blackNbors(blackTiles, candidate);
    const coordHash = hashPoint(candidate);
    const isBlackTile = coordHash in blackTiles;

    if (
      (isBlackTile && (nbors == 1 || nbors == 2)) ||
      (!isBlackTile && nbors == 2)
    ) {
      next[coordHash] = candidate;
    }
  }

  return simulateDay(next, n - 1);
}

// deno-fmt-ignore
export default {
  part1: (input: string) =>
    [...Object.keys(flipTiles(parse(input)))].length,
  part2: (input: string) =>
    [...Object.keys(simulateDay(flipTiles(parse(input)), 100))].length,
};
