from typing import Optional
from collections import deque
# Definition for a binary tree node.

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTreeDfs(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # DFS = stack
        stack = [(p, q)]
        while stack:
            p, q = stack.pop()
            if p or q:
                if not p or not q or p.val != q.val:
                    return False
                stack.append((p.left, q.left))
                stack.append((p.right, q.right))
        return True

    
    def isSameTreeBfs(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # BFS = queue
        queue = deque([(p, q)])
        while queue:
            p, q = queue.popleft()
            if p or q:
                if not p or not q or p.val != q.val:
                    return False
                queue.append((p.left, q.left))
                queue.append((p.right, q.right))
        return True

    def isSameTreeRecursiveDfs(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False

        return self.isSameTreeRecursiveDfs(p.left, q.left) and self.isSameTreeRecursiveDfs(p.right, q.right)