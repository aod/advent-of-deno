import { CircularList, CircularNode } from "../ll.ts";

type Cup = number;

function destinationCup(cups: CircularList<Cup>): Cup {
  const head = cups.head!;
  const pickup = [head.next.val, head.next.next.val, head.next.next.next.val];
  let target = head.val;

  do {
    if (--target < 1) target = cups.length;
  } while (pickup.includes(target));

  return target;
}

type LookUp = Record<Cup, CircularNode<Cup>>;

function move(cups: CircularList<Cup>, memo: LookUp) {
  const dest = memo[destinationCup(cups)];
  const head = cups.head!;

  const puHead = head.next;
  const puTail = puHead.next.next;

  head.next = puTail.next;
  puTail.next = dest.next;
  dest.next = puHead;

  cups.head = head.next;
}

function part1(input: string) {
  const memo: LookUp = {};
  const cups = new CircularList<Cup>();

  for (const x of input.split("").map(Number)) {
    memo[x] = cups.push(x);
  }

  for (let i = 0; i < 100; i++) {
    move(cups, memo);
  }

  cups.head = memo[1];
  return [...cups].splice(1).join("");
}

function part2(input: string) {
  const memo: LookUp = {};
  const cups = new CircularList<Cup>();

  for (const x of input.split("").map(Number)) {
    memo[x] = cups.push(x);
  }
  for (let i = cups.length + 1; i <= 1_000_000; i++) {
    memo[i] = cups.push(i);
  }

  for (let i = 0; i < 10_000_000; i++) {
    move(cups, memo);
  }

  return memo[1].next.val * memo[1].next.next.val;
}

export default { part1, part2 };
