function lengthOfLongestSubstring(s: string): number {
    let l = 0;
    let maxLen = 0;
    const curr = new Set<string>();

    for (let r = 0; r < s.length; r++) {
        while (curr.has(s[r])) {
            curr.delete(s[l]);
            l++;
        } 

            curr.add(s[r]);
            maxLen = Math.max(r - l + 1, maxLen);
    }

    return maxLen;
};

// console.log(lengthOfLongestSubstring("aab"));
// console.log(lengthOfLongestSubstring("dvdf"));
console.log(lengthOfLongestSubstring("pwwkew"));