/**
 * 0 = [0]
 * 1 = [0, 1]
 * 2 = [0, 1, 1]
 * 3 = [0, 1, 1, 2]
 * 4 = [0, 1, 1, 2, 1]
 */

/**
 * 0 = 0000
 * 1 = 0001 = 1 + ans[n - 1]
 * 2 = 0010 = 1 + ans[n - 2]
 * 3 = 0011 = 1 + ans[n - 2]
 * 4 = 0100 = 1 + ans[n - 4]
 * 5 = 0101 = 1 + ans[n - 4]
 * 6 = 0110 = 1 + ans[n - 4]
 * 7 = 0111 = 1 + ans[n - 4]
 * 8 = 1000 = 1 + ans[n - 8]
 * 9 = 1001 = 1 + ans[n - 8]
 */

function countBits(n: number): number[] {
  let ans = new Array<number>(n + 1);
  ans[0] = 0;
  let offset = 1;
  for (let i = 1; i < n + 1; i++) {
    if (offset * 2 === i) {
      offset = offset * 2;
    }
    ans[i] = 1 + ans[i - offset];
  }
  return ans;
}

console.log(countBits(5));
