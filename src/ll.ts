export interface Node<T> {
  val: T;
  next?: this;
};

export interface CircularNode<T> extends Node<T> {
  next: this;
}

export class CircularList<T> {
  public head?: CircularNode<T>;
  public size = 0;
  private last?: CircularNode<T>;

  append(val: T): CircularNode<T> {
    const node = { val } as CircularNode<T>;

    if (!this.head || !this.last) {
      node.next = node;
      this.head = node;
      this.last = node;
    } else {
      const tmp = this.last;
      node.next = this.head;
      tmp.next = node;
      this.last = node;
    }

    this.size++;
    return node;
  }

  *[Symbol.iterator]() {
    if (!this.head) return;
    let tmp = this.head;
    do {
      yield tmp.val;
      tmp = tmp.next;
    } while (tmp !== this.head);
  }
}
