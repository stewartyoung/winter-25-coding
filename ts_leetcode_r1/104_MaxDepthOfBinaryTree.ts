/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function maxDepthDFSRecursive(root: TreeNode | null): number {
    if (root == null) {
        return 0;
    }

    return 1 + Math.max(maxDepthDFSRecursive(root.left), maxDepthDFSRecursive(root.right))
};

function maxDepthBFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    const queue: TreeNode[] = [root];
    let levels: number = 0;
    
    while (queue.length !== 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;  // Use shift() for FIFO (BFS)

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {  
                queue.push(node.right);
            }
        }
        levels = levels + 1; 
    }

    return levels;
}

function maxDepthIterativeDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    // Stack stores [node, depth] pairs
    const stack: Array<[TreeNode, number]> = [[root, 1]];
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop()!;
        
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right !== null) {
            stack.push([node.right, depth + 1]);
        }
        if (node.left !== null) {
            stack.push([node.left, depth + 1]);
        }
    }
    
    return maxDepth;
}