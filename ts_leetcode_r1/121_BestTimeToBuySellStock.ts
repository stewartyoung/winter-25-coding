function maxProfit(prices: number[]): number {
    let maxProfit: number = 0;

    if (prices.length < 2) {
        return maxProfit;
    }

    let l = 0;
    let r = 1;

    while (r < prices.length) {
        maxProfit = Math.max(prices[r] - prices[l], maxProfit);
        if (prices[r] < prices[l]) {
            // update pointer to new lowest price
            l = r;
        }
        r++;
    }

    return maxProfit;
};

console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit([7,6,4,3,1]))