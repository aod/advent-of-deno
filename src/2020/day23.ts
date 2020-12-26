import { Circular, Node } from "../ll.ts";

function pickUpCups(cups: Circular<number>): [number, number, number] {
  const head = cups.head as Node<number>;
  return [head.next.val, head.next.next.val, head.next.next.next.val];
}

type LookUp = { [key: number]: Node<number> };

function destinationCup(cups: Circular<number>, memo: LookUp): Node<number> {
  let target = cups.head?.val as number;
  const pickup = pickUpCups(cups);

  do {
    if (--target < 1) target = cups.size;
  } while (pickup.includes(target));

  return memo[target];
}

function move(cups: Circular<number>, memo: LookUp) {
  const dest = destinationCup(cups, memo);

  const puHead = cups.head?.next as Node<number>;
  const puTail = puHead.next.next;

  (cups.head as Node<number>).next = puTail.next;
  puTail.next = dest.next;
  dest.next = puHead;

  cups.head = cups.head?.next;
}

function labels(cups: Circular<number>): string {
  let one = cups.head as Node<number>;
  while (one.val != 1) {
    one = one.next;
  }

  let res = "";
  let tmp = one.next;
  while (tmp !== one) {
    res += tmp.val;
    tmp = tmp.next;
  }

  return res;
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

  return labels(cups);
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
