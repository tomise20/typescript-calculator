"use strict";
class Calculator {
    constructor() {
        this.screen = document.getElementById("screenInput");
        this.subResult = document.getElementById("sub-result");
        this.result = 0;
        this.operations = "";
        this.isCharDigit = (n) => !!n.trim() && n > -1;
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', _ => this.addNumber(item.textContent));
        });
        document.addEventListener("keydown", e => {
            if (e.isComposing)
                return;
            console.log(e.key);
            if (this.isCharDigit(e.key)) {
                this.addNumber(e.key);
            }
            else {
                switch (e.key) {
                    case "Backspace":
                        let length = this.screen.value.length;
                        this.screen.value = this.screen.value.substring(0, (length - 1));
                        break;
                    case "Enter":
                        this.showResult();
                        break;
                    case "Delete":
                        this.reset();
                        break;
                    case ".":
                        this.screen.value += e.key;
                        break;
                    case "+":
                        this.cleanScreen(e.key);
                        break;
                    case "-":
                        this.cleanScreen(e.key);
                        break;
                    case "*":
                        this.cleanScreen(e.key);
                        break;
                    case "/":
                        this.cleanScreen(e.key);
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
        this.subResult.innerHTML += parseFloat(this.screen.value) + " " + key + " ";
        this.operations += this.screen.value + key;
        this.screen.value = "";
        console.log(this.operations);
    }
    showResult() {
        if (this.screen.value === "")
            return;
        this.subResult.innerHTML += this.screen.value + " =";
        this.operations += this.screen.value;
        this.result = eval(this.operations);
        this.screen.value = this.result;
        this.operations = "";
    }
    reset() {
        this.screen.value = "0";
        this.operations = "";
        this.subResult.innerHTML = "";
    }
}
new Calculator();
