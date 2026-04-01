// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // in order traversal
  const queue = [root];
  while (queue.length > 0) {
    const curr: TreeNode | null = queue.pop();
    if (curr === null) {
      continue;
    }
    if (isSameTree(curr, subRoot)) {
      return true;
    }
    if (curr.right !== null && curr.right !== undefined) {
      queue.push(curr.right);
    }
    if (curr.left !== null && curr.left !== undefined) {
      queue.push(curr.left);
    }
  }

  return false;
}

function isSameTree(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  if (a.val !== b.val) return false;

  return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}
