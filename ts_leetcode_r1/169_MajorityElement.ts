function majorityElement(nums: number[]): number {
    const len: number = nums.length;
    let maxCount: number = 0;

    // we can loop through this in a dictionary increment the count
    let numsMap = new Map<number, number>();

    for (let i = 0; i < len; i++) {
        let updated;
        if (numsMap.has(nums[i])) {
            updated = numsMap.get(nums[i])! + 1;
            numsMap.set(nums[i], updated);
        }
        else {
            updated = 1;
            numsMap.set(nums[i], updated);
        }
        
        maxCount = Math.max(updated, maxCount);
        // terminating condition
        // if max(numsMap.count) > Math.floor(nums.length / 2) we can stop
        if (maxCount > Math.floor(len / 2)) {
            return nums[i];
        }
    }
    
    // never reach according to conditions
    return 0;
};

console.log(majorityElement([1,1,3,1,1,2]));