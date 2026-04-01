class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # store min and max at each index
        res = max(nums)
        currMin, currMax = 1, 1
        for num in nums:
            temp = currMax * num
            currMax = max(num * currMax, num * currMin, num)
            currMin = min(temp, num * currMin, num)
            res = max(currMax, res)
        return res