class Item<Value> {
  public next: Item<Value> | null = null;

  constructor(public readonly value: Value) {}
}

export class Queue<Value> {
  private head: Item<Value> | null = null;
  private tail: Item<Value> | null = null;

  push(value: Value): Item<Value> {
    const item = new Item(value);

    if (this.tail) {
      this.tail.next = item;
      this.tail = item;
    } else {
      this.head = item;
      this.tail = item;
    }

    return item;
  }

  pop(): Item<Value> | null {
    const item = this.head;
    this.head = this.head?.next ?? null;

    if (this.head == null) {
      this.tail = null;
    }

    return item;
  }
}
