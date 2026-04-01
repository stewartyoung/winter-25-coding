function isValid(s: string): boolean {
    const map = new Map<string, string>();
    map.set("{", "}");
    map.set("(", ")");
    map.set("[", "]");

    const queue: string[] = []

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            queue.push(map.get(s[i])!);
        } else if (queue.pop() !== s[i]) {
            return false;
        }
    }

    if (queue.length === 0) {
        return true;
    } else {
        return false;
    }
};

console.log(isValid("(]"));
console.log(isValid("([])"));
console.log(isValid("([)]"));