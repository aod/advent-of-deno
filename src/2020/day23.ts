import { Circular, Node } from "../ll.ts";

function destinationCup(cups: Circular<number>): number {
  const head = cups.head!;
  const pickup = [head.next.val, head.next.next.val, head.next.next.next.val];
  let target = head.val;

  do {
    if (--target < 1) target = cups.size;
  } while (pickup.includes(target));

  return target;
}

type LookUp = { [key: number]: Node<number> };

function move(cups: Circular<number>, memo: LookUp) {
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
  const cups = new Circular<number>();

  for (const x of input.split("").map(Number)) {
    memo[x] = cups.append(x);
  }

  for (let i = 0; i < 100; i++) {
    move(cups, memo);
  }

  cups.head = memo[1];
  return [...cups].splice(1).join("");
}

function part2(input: string) {
  const memo: LookUp = {};
  const cups = new Circular<number>();

  for (const x of input.split("").map(Number)) {
    memo[x] = cups.append(x);
  }
  for (let i = cups.size + 1; i <= 1_000_000; i++) {
    memo[i] = cups.append(i);
  }

  for (let i = 0; i < 10_000_000; i++) {
    move(cups, memo);
  }

  return memo[1].next.val * memo[1].next.next.val;
}

export default { part1, part2 };
