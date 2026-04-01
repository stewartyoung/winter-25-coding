function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const startColor: number = image[sr][sc];
    if (startColor === color) return image;
    let queue: [number,number][] = [[sr,sc]];
    const maxX = image.length;
    const maxY = image[0].length;
    let coords: [number, number] = [sr, sc];

    while (queue.length !== 0) {
        let nextX = coords[0];
        let nextY = coords[1];
        if (nextX - 1 >= 0 && image[nextX - 1][nextY] === startColor ) {
            image[nextX-1][nextY] = color;
            queue.push([nextX-1, nextY])
        }
        if (nextX + 1 <= maxX - 1 && image[nextX + 1][nextY] === startColor ) {
            image[nextX+1][nextY] = color;
            queue.push([nextX+1, nextY])
        }
        if (nextY - 1 >= 0 && image[nextX][nextY - 1] === startColor ) {
            image[nextX][nextY - 1]  = color;
            queue.push([nextX, nextY - 1])
        }
        if (nextY + 1 <= maxY - 1 && image[nextX][nextY + 1] === startColor ) {
            image[nextX][nextY + 1]  = color;
            queue.push([nextX, nextY + 1])
        }

        coords = queue.pop()!;
        image[coords![0]][coords![1]] = color;
    }

    return image;
};

console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2))