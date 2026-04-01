function hammingWeight(n: number): number {
    let res = 0;
    while (n > 0) {
        res += n % 2;
        n = n >> 1;
    }

    return res;
};

// function hammingWeightTrick(n: number): number {
//     let res = 0;
//     while (n > 0) {
//         n = n & (n - 1)
//         res++;
//     }

//     return res;
// };


console.log(hammingWeight(11))
console.log(hammingWeight(128))
console.log(hammingWeight(12147483645))