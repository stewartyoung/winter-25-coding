from typing import List
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        map = {}
        for i, val in enumerate(nums):
            if target - val in map:
                return [map[target-val], i]
            map[val] = i
        return []