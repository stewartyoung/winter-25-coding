function longestPalindrome(s: string): number {
    let longest = 0;
    const seen = new Set<string>();
    if (s.length === 1) {
        return 1;
    }
    for (let i = 0; i < s.length; i++) {
        if (seen.has(s[i])) {
            longest += 2;
            seen.delete(s[i])
        } else {
            seen.add(s[i])
        }
    }

    // final check for if we can add one unmatched element
    if (seen.size !== 0) {
        return longest + 1;
    }
    return longest;
};

console.log(longestPalindrome("abccccdd"));