export class ListNode {
  prev: ListNode | null;
  next: ListNode | null;
  position: [number, number];

  constructor(
    position: [number, number],
    prev: ListNode | null = null,
    next: ListNode | null = null,
  ) {
    this.prev = prev;
    this.next = next;
    this.position = [...position];
  }
}

export class CaculateNode {
  private dummyHead: ListNode;
  private dummyTail: ListNode;
  private length: number;
  private score: number;

  constructor(position: [number, number]) {
    this.dummyHead = new ListNode([1e9, 1e9]);
    this.dummyTail = new ListNode([1e9, 1e9]);
    const initNode = new ListNode(
      [...position],
      this.dummyHead,
      this.dummyTail,
    );
    this.dummyHead.next = initNode;
    this.dummyTail.prev = initNode;
    this.score = 0;
    this.length = 1;
  }

  getHead() {
    return this.dummyHead.next as ListNode;
  }

  getTail() {
    return this.dummyTail.prev as ListNode;
  }

  getLength() {
    return this.length;
  }

  getScore() {
    return this.score;
  }

  append(position: [number, number]) {
    // 新增再尾巴
    const newNode = new ListNode([...position]);
    const prev = this.dummyTail.prev as ListNode;
    prev.next = newNode;
    newNode.prev = prev;
    this.dummyTail.prev = newNode;
    this.score += 1;
    this.length += 1;
    return this.score;
  }

  update(position: [number, number]) {
    // 把尾巴丟掉更新頭部
    if (!this.dummyHead.next) return;
    const next = this.dummyHead.next;
    const newNode = new ListNode([...position]);
    next.prev = newNode;
    newNode.next = next;
    this.dummyHead.next = newNode;
    newNode.prev = this.dummyHead;

    const oldTail = this.dummyTail.prev as ListNode;
    const newTail = oldTail.prev as ListNode;
    newTail.next = this.dummyTail;
    this.dummyTail.prev = newTail;

    return oldTail;
  }

  reset(position: [number, number]) {
    const newNode = new ListNode(position, this.dummyHead, this.dummyTail);
    this.dummyHead.next = newNode;
    this.dummyTail.prev = newNode;
    this.length = 1;
    this.score = 0;
    return newNode;
  }
}
