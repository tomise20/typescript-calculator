"use strict";
//import Operations from './Operations';
//var op = new Operations();
class Calculator {
    constructor() {
        this.screen = document.getElementById("screenInput");
        this.subResult = document.getElementById("sub-result");
        this.result = 0;
        this.operations = "";
        this.isCharDigit = (n) => !!n.trim() && n > -1;
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', (e) => this.addNumber(item.textContent));
        });
        document.addEventListener("keydown", e => {
            if (e.isComposing)
                return;
            if (e.key === "Enter") {
                this.showResult();
            }
            if (this.isCharDigit(e.key)) {
                this.addNumber(e.key);
            }
            else {
                switch (e.key) {
                    case ",":
                        this.screen.value += e.key;
                        break;
                    case "+":
                        this.operations += this.screen.value;
                        this.cleanScreen(e.key);
                        break;
                    case "-":
                        this.operations += this.screen.value;
                        this.cleanScreen(e.key);
                        break;
                    case "*":
                        this.result *= parseFloat(this.screen.value);
                        break;
                    case "/":
                        this.result /= parseFloat(this.screen.value);
                        break;
                }
            }
        });
    }
    addNumber(param) {
        if (this.screen.value === "0") {
            this.screen.value = param;
        }
        else {
            this.screen.value += param;
        }
    }
    cleanScreen(key) {
        this.subResult.innerHTML += this.screen.value + " " + key + " ";
        this.operations += this.screen.value + key;
        this.screen.value = "";
        console.log(this.operations);
    }
    showResult() {
        if (this.screen.value === "")
            return;
        this.operations += this.screen.value;
        this.result = eval(this.operations);
        this.screen.value = this.result;
        this.operations = this.result;
    }
}
new Calculator();
