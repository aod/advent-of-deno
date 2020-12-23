type Node<T> = {
  val: T;
  next?: Node<T>;
};

class Circular<T> {
  public head?: Node<T>;
  public size: number = 0;
  private last?: Node<T>;

  append(val: T): Node<T> {
    let node: Node<T> = { val };

    if (!this.head) {
      node.next = node;
      this.head = node;
      this.last = node;
    } else {
      let tmp = this.last as Node<T>;
      node.next = this.head;
      tmp.next = node;
      this.last = node;
    }

    this.size++;
    return node;
  }
}

function pickUpCups(cups: Circular<number>): [number, number, number] {
  return [
    cups.head?.next?.val as number,
    cups.head?.next?.next?.val as number,
    cups.head?.next?.next?.next?.val as number,
  ];
}

type LookUp = { [key: number]: Node<number> };

function destinationCup(cups: Circular<number>, memo: LookUp): Node<number> {
  let target = cups.head?.val as number - 1;
  if (target < 1) {
    target = cups.size;
  }

  const pickup = pickUpCups(cups);
  while (pickup.includes(target)) {
    if (--target < 1) target = cups.size;
  }

  return memo[target];
}

function move(cups: Circular<number>, memo: LookUp) {
  const dest = destinationCup(cups, memo);

  let puHead = cups.head?.next as Node<number>;
  let puTail = puHead.next?.next as Node<number>;

  (cups.head as Node<number>).next = puTail.next;
  puTail.next = dest.next;
  dest.next = puHead;

  cups.head = cups.head?.next;
}

function labels(cups: Circular<number>): string {
  let one = cups.head as Node<number>;
  while (one.val != 1) {
    one = one?.next as Node<number>;
  }

  let res = "";
  let tmp = one.next as Node<number>;
  while (tmp !== one) {
    res += tmp.val;
    tmp = tmp?.next as Node<number>;
  }

  return res;
}

export default {
  part1(input: string): string {
    const memo: LookUp = {};
    const cups = new Circular<number>();
    for (const x of input.split("").map(Number)) {
      const n = cups.append(x);
      memo[x] = n;
    }

    for (let i = 0; i < 100; i++) {
      move(cups, memo);
    }

    return labels(cups);
  },

  part2(input: string): string {
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

    const one = memo[1];
    const fst = one.next?.val as number;
    const snd = one.next?.next?.val as number;
    return "" + (fst * snd);
  },
};
