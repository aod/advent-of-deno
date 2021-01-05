type Card = number;
type Deck = Card[];

type Game = [Deck, Deck];
type GameHash = string;

type PlayerTurn = [Deck, Card];
type Round = [PlayerTurn, PlayerTurn];

function parse(input: string): Game {
  return input.split("\n\n")
    .map((playerDeck) => playerDeck.split("\n").slice(1))
    .map((cards) => cards.map(Number)) as Game;
}

function score(deck: Deck): number {
  let i = deck.length;
  let result = 0;
  for (const card of deck) {
    result += card * i--;
  }
  return result;
}

function simulateCombat(game: Game): Deck {
  const [d1, d2] = game.map((deck) => deck.slice());
  while (d1.length && d2.length) {
    const [c1, c2] = [d1.shift()!, d2.shift()!];
    if (c1 > c2) d1.push(c1, c2);
    else d2.push(c2, c1);
  }
  return d1.length > 0 ? d1 : d2;
}

function part1(input: string) {
  return score(simulateCombat(parse(input)));
}

function hashGame([a, b]: Game): GameHash {
  return `${a.join(",")}|${b.join(",")}`;
}

function shouldPlaySubGame([[d1, c1], [d2, c2]]: Round): boolean {
  return c1 <= d1.length && c2 <= d2.length;
}

function simulateRecursiveCombat(game: Game): Deck {
  /** Returns true if the first deck wins the game. */
  function recursiveCombat([d1, d2]: Game): boolean {
    const prevGameStates = new Set<GameHash>();

    do {
      const [c1, c2] = [d1.shift()!, d2.shift()!];
      const won = shouldPlaySubGame([[d1, c1], [d2, c2]])
        ? recursiveCombat([d1.slice(0, c1), d2.slice(0, c2)])
        : c1 > c2;

      if (won) d1.push(c1, c2);
      else d2.push(c2, c1);

      const gameHash = hashGame([d1, d2]);
      if (prevGameStates.has(gameHash)) return true;
      prevGameStates.add(gameHash);
    } while (d1.length && d2.length);

    return d1.length > 0;
  }

  const [d1, d2] = game.map((deck) => deck.slice());
  return recursiveCombat([d1, d2]) ? d1 : d2;
}

function part2(input: string) {
  return score(simulateRecursiveCombat(parse(input)));
}

export default { part1, part2 };
