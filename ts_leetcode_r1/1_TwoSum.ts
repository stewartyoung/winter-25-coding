function twoSum(nums: number[], target: number): number[] {
    // exhaustive, start at index 0, check index 1, 2, 3 

    // is there earlier stop?

    // we are told not ordered

    // hashset store of nums
    // check (target - nums[i]) in hashset via single pass

    const numsToIndex = new Map<number, number>();

    for (let i = 0; i < nums.length; i++)   {
        const search = target - nums[i];
        if (numsToIndex.has(search)) {
            return [numsToIndex.get(search)!, i];
        }
        numsToIndex.set(nums[i], i);
    }

    return []; 
};