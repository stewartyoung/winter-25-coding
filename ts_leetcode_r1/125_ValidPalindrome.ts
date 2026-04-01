function isPalindrome(s: string): boolean {
    const fs = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    // two pointers
    let l = 0
    let r = fs.length -1;

    while (r > l) {
        if (fs[l] != fs[r]) {
            return false
        }

        r--;
        l++;
    }

    return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));