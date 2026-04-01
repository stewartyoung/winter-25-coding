/**
 * Definition for singly-linked list.
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseListSlow(head: ListNode | null): ListNode | null {
    // stack
    const stack: ListNode[] = [];

    while(head !== null) {
        stack.push(head);
        head = head.next;
    }
    
    // pop the end off
    let end: ListNode = stack.pop()!;
    
    while(stack.length !== 0) {
        const next = stack.pop();
        if (next !== undefined) {
            end.next = next; 
            end = next;
        }
    }
    
    // terminate list
    end.next = null;

    return end;
};

// tortoise and hare/ fast and slow pointers
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    
    while (curr !== null) {
        const next: ListNode | null = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}