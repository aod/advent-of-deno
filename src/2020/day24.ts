type Direction = "e" | "se" | "sw" | "w" | "nw" | "ne";

type Coord = [number, number, number];
type Tile = {
  coord: Coord;
  isWhiteTile: boolean;
};

const dirDeltas: { [key in Direction]: Coord } = {
  "e": [1, -1, 0],
  "se": [0, -1, 1],
  "sw": [-1, 0, 1],
  "w": [-1, 1, 0],
  "nw": [0, 1, -1],
  "ne": [1, 0, -1],
};

function moveTile(tile: Tile, steps: Direction[]) {
  for (const step of steps) {
    const delta = dirDeltas[step];
    tile.coord[0] += delta[0];
    tile.coord[1] += delta[1];
    tile.coord[2] += delta[2];
  }
}

type Instruction = {
  tile: Tile;
  steps: Direction[];
};

function parse(input: string): Instruction[] {
  const result: Instruction[] = [];

  for (const line of input.split("\n")) {
    const steps: Direction[] = [];
    for (let i = 0; i <= line.length - 1; i++) {
      const cur = line[i];

      if (cur == "e" || cur == "w") {
        steps.push(cur);
      } else if (cur == "s") {
        if (line[i + 1] == "e") {
          steps.push("se");
        } else {
          steps.push("sw");
        }
        i++;
      } else if (cur == "n") {
        if (line[i + 1] == "e") {
          steps.push("ne");
        } else {
          steps.push("nw");
        }
        i++;
      }
    }

    result.push({ steps, tile: { isWhiteTile: true, coord: [0, 0, 0] } });
  }

  return result;
}

type TileFloor = { [key: string]: Tile };

function nborCoords(tile: Tile): Coord[] {
  return [
    dirDeltas["e"],
    dirDeltas["se"],
    dirDeltas["sw"],
    dirDeltas["w"],
    dirDeltas["nw"],
    dirDeltas["ne"],
  ].map((
    [x, y, z],
  ) => [tile.coord[0] + x, tile.coord[1] + y, tile.coord[2] + z]);
}

function getBlackTiles(tileFloor: TileFloor): Tile[] {
  return Object.values(tileFloor).filter((tile) => !tile.isWhiteTile);
}

function nbors(tile: Tile, tileFloor: TileFloor): number {
  let res = 0;
  for (const nborCoord of nborCoords(tile)) {
    const coordHash = nborCoord.join(",");
    if (coordHash in tileFloor && !tileFloor[coordHash].isWhiteTile) {
      res++;
    }
  }
  return res;
}

function flipTiles(instructions: Instruction[]): TileFloor {
  const tileFloor: TileFloor = {};

  for (const instr of instructions) {
    const { tile, steps } = instr;
    moveTile(tile, steps);
    const tileHash = tile.coord.join(",");

    if (tileHash in tileFloor) {
      tileFloor[tileHash].isWhiteTile = !tileFloor[tileHash].isWhiteTile;
    } else {
      tile.isWhiteTile = false;
      tileFloor[tileHash] = tile;
    }
  }

  return tileFloor;
}

function prepareTileFloor(tileFloor: TileFloor) {
  for (const blackTile of getBlackTiles(tileFloor)) {
    for (const mabyeWhiteTile of nborCoords(blackTile)) {
      const coordHash = mabyeWhiteTile.join(",");
      if (!(coordHash in tileFloor)) {
        tileFloor[coordHash] = { coord: mabyeWhiteTile, isWhiteTile: true };
      }
    }
  }
}

function simulateDay(tileFloor: TileFloor, n: number): TileFloor {
  for (let i = 0; i < n; i++) {
    const tilesToFlip = [];

    prepareTileFloor(tileFloor);
    for (const tile of Object.values(tileFloor)) {
      const count = nbors(tile, tileFloor);
      if (
        (tile.isWhiteTile && count == 2) ||
        (!tile.isWhiteTile && (count == 0 || count > 2))
      ) {
        tilesToFlip.push(tile);
      }
    }

    for (const tile of tilesToFlip) {
      tile.isWhiteTile = !tile.isWhiteTile;
    }
  }

  return tileFloor;
}

export default {
  part1: (input: string) => getBlackTiles(flipTiles(parse(input))).length,
  part2: (input: string) =>
    getBlackTiles(simulateDay(flipTiles(parse(input)), 100)).length,
};
