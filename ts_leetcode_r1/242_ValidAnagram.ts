function isAnagram(s: string, t: string): boolean {
    // if s contains all the letters of t in the same amounts

    // two dicts, loop over s first to build up target
    // loop over t to check against target
    // O(2N) = O(n)

    // sort is at best O(nlog(n)) which is not better than O(n)

    const sMap = new Map<string, number>(); // map string to counts
    const tMap = new Map<string, number>(); // map string to counts
    for (let c of s) {
        sMap.set(c, sMap.get(c) != undefined ? sMap.get(c)! + 1 : 1);
    }

    for (let char of t) {
        tMap.set(char, tMap.get(char) != undefined ? tMap.get(char)! + 1 : 1);
    }

    if (sMap.size !== tMap.size) return false;
    for (const [k, v] of sMap) {
        if (!Object.is(v, tMap.get(k))) return false;
    }
    return true;
};

// console.log(isAnagram("anagram", "nagaram"));
// console.log(isAnagram("rat", "car"));
console.log(isAnagram("aa", "a"));