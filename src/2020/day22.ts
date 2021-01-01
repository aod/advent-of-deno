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
    const c1 = d1.shift()!;
    const c2 = d2.shift()!;

    if (c1 > c2) {
      d1.push(c1);
      d1.push(c2);
    } else {
      d2.push(c2);
      d2.push(c1);
    }
  }

  return score(d1.length > 0 ? d1 : d2);
}

function deckEquals(a: Deck, b: Deck): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

function roundEquals([a1, a2]: Round, [b1, b2]: Round): boolean {
  return deckEquals(a1, b1) && deckEquals(a2, b2);
}

/** Returns true if the first deck wins the game. */
function recursiveCombat(d1: Deck, d2: Deck): boolean {
  const previousRounds: Round[] = [[[], []]];

  while (d1.length && d2.length) {
    if (previousRounds.some(roundEquals.bind(null, [d1, d2]))) return true;
    previousRounds.push([d1.slice(), d2.slice()]);

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
  }

  return d1.length > 0;
}

function part2(input: string) {
  const [d1, d2] = parse(input);
  const winner = recursiveCombat(d1, d2) ? d1 : d2;
  return score(winner);
}

export default { part1, part2 };
