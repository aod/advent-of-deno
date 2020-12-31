export interface Node<T> {
  val: T;
  next?: this;
};

export interface CircularNode<T> extends Node<T> {
  next: this;
}

export class CircularList<T> {
  public head?: CircularNode<T>;

  private _length = 0;
  private _last?: CircularNode<T>;

  push(val: T): CircularNode<T> {
    const node = { val } as CircularNode<T>;

    if (!this.head || !this._last) {
      node.next = node;
      this.head = node;
      this._last = node;
    } else {
      const tmp = this._last;
      node.next = this.head;
      tmp.next = node;
      this._last = node;
    }

    this._length++;
    return node;
  }

  get length() {
    return this._length;
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
