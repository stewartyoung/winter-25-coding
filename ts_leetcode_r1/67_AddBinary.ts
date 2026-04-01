function addBinary(a: string, b: string): string {
    const res: number[] = [];
    var carry = 0;

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const numA = i < a.length ? parseInt(a[a.length - 1 - i]) : 0;
        const numB = i < b.length ? parseInt(b[b.length - 1 - i]) : 0;
        const total = numA + numB + carry;
        carry = Math.floor(total / 2);

        res.unshift(total % 2);
    }
    if (carry !== 0) {
        res.unshift(1);
    }
    return res.join("");
};

function addBinaryOptimised(a: string, b: string): string {
    const res: number[] = [];
    var carry = 0;

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const numA = i < a.length ? parseInt(a[a.length - 1 - i]) : 0;
        const numB = i < b.length ? parseInt(b[b.length - 1 - i]) : 0;
        const total = numA + numB + carry;
        carry = Math.floor(total / 2);
        
        // O(1), unshift is O(n)
        res.push(total % 2);
    }
    if (carry !== 0) {
        res.push(1);
    }
    return res.reverse().join("");
};

// console.log(addBinary("11", "1"));
console.log(addBinary("1010", "1011"));