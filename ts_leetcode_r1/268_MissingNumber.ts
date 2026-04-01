function missingNumberSlow(nums: number[]): number {
    // try for O(n)

    // could sort first but that is at best O(nlog(n))

    // first create a Set of nums we have
    const set = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        set.add(nums[i]);
    }

    // number we want is the only number not in the set

    for(let j = 0; j <= nums.length; j++) {
        if(!set.has(j)) {
            return j;
        }
    }

    return 0;
};

function missingNumber(nums: number[]): number {
    // sum (0 ... n) - sum(nums[i])
    let res = nums.length;
    for (let i = 0; i < nums.length; i++) {
        res += (i - nums[i]);
    }

    return res;
};


console.log(missingNumber([9,6,4,2,3,5,7,0,1]))