// fast and slow pointers

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycleSlow(head: ListNode | null): boolean {
    const dummy = head;
    let curr = dummy;
    const seen = new Set<ListNode>();
    while (curr != null) {
        if (seen.has(curr)) {
            return true;
        }
        seen.add(curr);
        curr = curr.next;
    }
    return false;
};

function hasCycle(head: ListNode | null): boolean {
    if (head == null) {
        return false;
    }
    let slow = head;
    let fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }    

    return false;
};