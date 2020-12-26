const MAGIC = 20201227;
const SUBJ_NUM = 7;

function loopSize(publicKey: number) {
  let val = 1;
  let lsize = 0;
  while (val !== publicKey) {
    val = (val * SUBJ_NUM) % MAGIC;
    lsize++;
  }
  return lsize;
}

function encryptionKey(publicKey: number, lsize: number) {
  let key = 1;
  for (let i = 0; i < lsize; i++) {
    key = (key * publicKey) % MAGIC;
  }
  return key;
}

function part1(input: string) {
  const keys = input.split("\n").map(Number);
  return encryptionKey(keys.shift()!, loopSize(keys.shift()!));
}

export default { part1, part2: (_: string) => "Happy holidays! ⭐" };
