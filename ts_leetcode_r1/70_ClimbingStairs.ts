function climbStairs(n: number): number {
    /**
     * n = 1, 
        * 1
     * n = 2, 
        * 1 + 1
        * 2
     * n = 3
        * 1 + 2
        * 2 + 1
        * 1 + 1 + 1
    * n = 4 
        * 1 + 2 + 1
        * 1 + 1 + 2
        * 2 + 1 + 1
        * 2 + 2
        * 1 + 1 + 1 + 1
    * n = 5
        * 1 + 1 + 1 + 2
        * 1 + 1 + 2 + 1
        * 1 + 2 + 1 + 1
        * 2 + 1 + 1 + 1
        * 2 + 1 + 2
        * 2 + 2 + 1
        * 1 + 2 + 2
        * 1 + 1 + 1 + 1 + 1      
     */

    let prev = 1; // ways (n-2)
    let curr = 1; // ways (n - 1)
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next; // curr is always climbStairs(n - 2) + climbStairs(n - 1)
    }
    return curr;
};

console.log(climbStairs(5))
console.log(climbStairs(4))