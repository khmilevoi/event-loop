export class Item<Value> {
  public prev: Item<Value> | null = null;

  constructor(public readonly value: Value) {}
}

export class Stack<Value> {
  private tail: Item<Value> | null = null;

  private length = 0;

  push(value: Value): Item<Value> {
    const item = new Item(value);

    item.prev = this.tail;
    this.tail = item;

    this.length += 1;

    return item;
  }

  pop(): Item<Value> | null {
    const item = this.tail;
    this.tail = this.tail?.prev ?? null;

    this.length -= 1;

    return item;
  }

  getLength() {
    return this.length;
  }
}
