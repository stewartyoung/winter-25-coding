function productExceptSelfBruteForce(nums: number[]): number[] {
    // what is the brute force way - O(N^2)
    const res: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        let prod = 1;
        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            prod = prod * nums[j]
        }
        res[i] = prod;
    }

    return res;
};

function productExceptSelf(nums: number[]): number[] {
    // first compute prefix products and suffixProducts for each index
    const prefixProducts: number[] = [];
    const suffixProducts: number[] = [];
    let i = 0;
    let prefixProduct = 1;
    let suffixProduct = 1;
    
    while (i < nums.length) {
        prefixProduct = i === 0 ? prefixProduct : prefixProduct * nums[i - 1];

        prefixProducts[i] = prefixProduct;

        i++;
    }

    /**
        aiming for:
        * [1, 1, 2, 6]
        * [24, 12, 4, 1]
     */ 
    let stack: number = 1;
    let j = nums.length - 1;
    while (j >= 0) {
        suffixProduct = suffixProduct * stack;
        stack = nums[j];
        suffixProducts[j] = suffixProduct;
        j--;
    }

    console.log(prefixProducts);
    console.log(suffixProducts);

    const res: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        res[i] = prefixProducts[i] * suffixProducts[i];
    }

    return res;
};

