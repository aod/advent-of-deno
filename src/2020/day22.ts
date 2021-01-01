type Card = number;
type Deck = Card[];
type Round = [Deck, Deck];

function parse(input: string): Round {
  return input.split("\n\n")
    .map((playerDeck) => playerDeck.split("\n").slice(1))
    .map((cards) => cards.map(Number)) as Round;
}

function score(deck: Deck): number {
  let i = deck.length;
  let result = 0;
  for (const card of deck) {
    result += card * i--;
  }
  return result;
}

function part1(input: string) {
  const [d1, d2] = parse(input);

  while (d1.length && d2.length) {
    const [c1, c2] = [d1.shift()!, d2.shift()!];

    if (c1 > c2) {
      d1.push(c1, c2);
    } else {
      d2.push(c2, c1);
    }
  }

  return score(d1.length > 0 ? d1 : d2);
}

type RoundHash = string;

function hashRound([a, b]: Round): RoundHash {
  return `${a.join(",")}|${b.join(",")}`;
}

/** Returns true if the first deck wins the game. */
function recursiveCombat(d1: Deck, d2: Deck): boolean {
  let roundHash = hashRound([d1, d2]);
  const previousRounds = new Set<RoundHash>();

  while (d1.length && d2.length) {
    if (previousRounds.has(roundHash)) {
      return true;
    }
    previousRounds.add(roundHash);

    const c1 = d1.shift()!;
    const c2 = d2.shift()!;

    const shouldPlaySubGame = c1 <= d1.length && c2 <= d2.length;
    const won = shouldPlaySubGame
      ? recursiveCombat(d1.slice(0, c1), d2.slice(0, c2))
      : c1 > c2;

    if (won) {
      d1.push(c1, c2);
    } else {
      d2.push(c2, c1);
    }

    roundHash = hashRound([d1, d2]);
  }

  return d1.length > 0;
}

function part2(input: string) {
  const [d1, d2] = parse(input);
  const winner = recursiveCombat(d1, d2) ? d1 : d2;
  return score(winner);
}

export default { part1, part2 };
