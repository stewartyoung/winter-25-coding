function evalRPN(tokens: string[]): number {
    // +, -, *, /
    const operands = new Set<string>(['+', '-', '*', '/']);
    
    // stack stores values
    const stack: number[] = [];

    for (let i = 0; i < tokens.length; i++) {
        console.log("stack: ", stack);
        if (operands.has(tokens[i])) {
            console.log("Operand: ", tokens[i])
            const b = stack.pop();
            console.log("Popped: " + b + ", new stack: ", stack)
            const a = stack.pop();
            console.log("Popped: " + a + ", new stack: ",stack)
            stack.push(evalOperand(tokens[i], a!, b!))
            console.log("Stack after pushing computed: ", stack)
        } else {
            const number =  Number(tokens[i]);
            stack.push(number);
            console.log("Pushed onto stack: ", stack);
        }
    }
    console.log("stack at the end", stack);
    return stack.pop()!;
};

function evalOperand(operand: string, a: number, b: number): number {
    if (operand === "+") {
        return a + b;
    }
    if (operand === "-") {
        return a - b;
    }
    if (operand === "*") {
        return a * b;
    }
    if (operand === "/") {
        return Math.trunc(a / b);
    }
    return a;
}

console.log(evalRPN(["2","1","+","3","*"]));
console.log(evalRPN(["4","13","5","/","+"]));
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));