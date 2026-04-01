function lengthOfLongestSubstring(s: string): number {
    // seems like sliding window

    // exhaustive is start at current and keep adding a letter until the end O(N^2)

    // order you are given certainly matters

    // if all different, length of string is answer

    // sliding window is the way to go

    // keep a set, if set contains next letter remove it

    const charSet = new Set<string>();
    let l = 0;
    let res = 0;

    for (let r = 0; r < s.length; r++) {
        // Use while, not if! We need to keep removing from left until duplicate is gone
        while (charSet.has(s[r])) {
            charSet.delete(s[l]);  // Remove from left side of window
            l += 1;
        }
        charSet.add(s[r]);
        res = Math.max(res, r - l + 1);
    }

    return res;
};

const test: string = "pwwkew"; 
lengthOfLongestSubstring(test);