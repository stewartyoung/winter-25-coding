function maxSubArray(nums: number[]): number {
  let maxSub = nums[0];
  let curSum = 0;

  for (let num of nums) {
    if (curSum < 0) {
      curSum = 0;  // stops out curSum if it has gone negative (no longer positively contributing)
    }
    curSum += num;
    maxSub = Math.max(maxSub, curSum);
  }

  return maxSub;
}
