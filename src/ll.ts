export type Node<T> = {
  val: T;
  next: Node<T>;
};

export class Circular<T> {
  public head?: Node<T>;
  public size = 0;
  private last?: Node<T>;

  append(val: T): Node<T> {
    const node = { val } as Node<T>;

    if (!this.head) {
      node.next = node;
      this.head = node;
      this.last = node;
    } else {
      const tmp = this.last as Node<T>;
      node.next = this.head;
      tmp.next = node;
      this.last = node;
    }

    this.size++;
    return node;
  }
}
