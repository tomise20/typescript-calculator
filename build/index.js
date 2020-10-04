"use strict";
class Calculator {
    constructor() {
        this.screen = document.getElementById("screenInput");
        this.subresult = document.getElementById("sub-result");
        this.result = 0;
        this.operations = "";
        this.clearSubresult = false;
        this.lastOperationsIsFunc = false;
        this.isCharDigit = (n) => !!n.trim() && n > -1;
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', _ => this.addNumberOnScreen(item.textContent));
        });
        document.querySelectorAll("span[data-type='operation']").forEach(item => {
            item.addEventListener('click', _ => this.actions(item.getAttribute('data-func')));
        });
        document.addEventListener("keydown", e => {
            if (e.isComposing)
                return;
            this.separator(e.key);
        });
    }
    actions(funcName) {
        switch (funcName) {
            case "clear":
                this.reset();
                break;
            case "clearScreen":
                this.screen.value = "0";
                break;
            case "clearSubresult":
                this.subresult.innerHTML = "";
                break;
            case "dot":
                this.screen.value += ".";
                this.operations += ".";
                this.subresult.innerHTML += ".";
                break;
            case "equal":
                this.showResult();
                break;
            case "plus":
                this.addOperations("+");
                break;
            case "subtraction":
                this.addOperations("-");
                break;
            case "multiplication":
                this.addOperations("*");
                break;
            case "divide":
                this.addOperations("/");
                break;
            case "pow":
                this.pow();
                break;
            case "sqrt":
                this.square();
                break;
            case "onePerX":
                this.onePerX();
                break;
        }
        console.log(this.operations);
    }
    separator(key) {
        if (this.isCharDigit(key)) {
            this.addNumberOnScreen(key);
        }
        else {
            switch (key) {
                case "Backspace":
                    let length = this.screen.value.length;
                    this.screen.value = this.screen.value.substring(0, (length - 1));
                    break;
                case ".":
                    this.screen.value += key;
                    this.operations += key;
                    this.subresult.innerHTML += key;
                    break;
                case "Enter":
                    this.showResult();
                    break;
                case "Delete":
                    this.reset();
                    break;
                case "+":
                    this.addOperations(key);
                    break;
                case "-":
                    this.addOperations(key);
                    break;
                case "*":
                    this.addOperations(key);
                    break;
                case "/":
                    this.addOperations(key);
                    break;
            }
        }
    }
    addNumberOnScreen(param) {
        if (this.clearSubresult) {
            this.subresult.innerHTML = this.screen.value;
            this.clearSubresult = false;
        }
        if (this.screen.value === "0")
            this.screen.value = param;
        else
            this.screen.value += param;
        this.operations += param;
        this.addSubresult(`${param}`);
        console.log(this.operations);
    }
    addSubresult(text) {
        this.subresult.innerHTML += text;
    }
    addOperations(key = null) {
        if (this.screen.value === "")
            return;
        if (this.clearSubresult) {
            this.subresult.innerHTML = this.screen.value;
            this.clearSubresult = false;
        }
        this.operations += key;
        this.addSubresult(` ${key} `);
        this.screen.value = "";
    }
    checkOperations() {
        let length = this.operations.length;
        let lastChar = this.operations.substring((length - 1));
        let temp;
        if (!this.isCharDigit(lastChar))
            temp = this.operations.substr(0, (length - 1));
        else
            temp = this.operations;
        return temp;
    }
    reset() {
        this.screen.value = "0";
        this.operations = "";
        this.subresult.innerHTML = "";
    }
    pow() {
        let num;
        let temp;
        let content;
        if (this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        }
        else {
            num = parseFloat(this.screen.value);
        }
        if (this.lastOperationsIsFunc) {
            this.operations = "";
            content = `sqr(${this.subresult.innerHTML})`;
        }
        else {
            content = `sqr(${num})`;
        }
        let operations = Math.pow(num, 2).toString();
        this.funcOperation(operations, content);
    }
    square() {
        let num;
        let temp;
        let content;
        if (this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        }
        else {
            num = parseFloat(this.screen.value);
        }
        if (this.lastOperationsIsFunc) {
            this.operations = "";
            content = `&#8730;(${this.subresult.innerHTML})`;
        }
        else {
            content = `&#8730;(${num})`;
        }
        let operations = Math.sqrt(num).toString();
        this.funcOperation(operations, content);
    }
    onePerX() {
        let num;
        let temp;
        let content;
        if (this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        }
        else {
            num = parseFloat(this.screen.value);
        }
        if (this.lastOperationsIsFunc) {
            this.operations = "";
            content = `1/(${this.subresult.innerHTML})`;
        }
        else {
            content = `1/(${num})`;
        }
        let operations = (1 / num).toString();
        this.funcOperation(operations, content);
    }
    funcOperation(func, content) {
        if (this.screen.value === this.subresult.innerHTML) {
            this.operations = "";
            this.subresult.innerHTML = "";
        }
        if (this.clearSubresult) {
            let lastChar = this.subresult.innerHTML.substr(this.subresult.innerHTML.length - 1);
            if (lastChar === "=") {
                this.operations = "";
                this.subresult.innerHTML = "";
            }
            else {
                this.subresult.innerHTML = this.screen.value;
            }
            this.clearSubresult = false;
        }
        if (this.lastOperationsIsFunc) {
            this.operations = "";
            this.subresult.innerHTML = content;
        }
        else {
            this.addSubresult(content);
        }
        let result = func.toString();
        this.operations += result;
        this.screen.value = result;
        this.lastOperationsIsFunc = true;
    }
    showResult() {
        if (this.screen.value === "" && this.subresult.innerHTML.length == 0)
            return;
        this.result = eval(this.operations);
        this.subresult.innerHTML += " =";
        this.screen.value = this.result.toString();
        this.operations = this.result.toString();
        this.clearSubresult = true;
    }
}
new Calculator();
