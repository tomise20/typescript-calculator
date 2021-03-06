class Calculator {
    screen: HTMLInputElement = <HTMLInputElement>document.getElementById("screenInput");
    subresult: HTMLDivElement = <HTMLDivElement>document.getElementById("sub-result");
    result: number = 0;
    operations: string = "";
    clearSubresult: boolean = false;
    lastOperationsIsFunc: boolean = false;
    clearScreen: boolean = true;

    constructor() {
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', _ => this.addNumberOnScreen(item.textContent));
        });

        document.querySelectorAll("span[data-type='operation']").forEach(item => {
            item.addEventListener('click', _ => this.actions(item.getAttribute('data-func')));
        });

        document.addEventListener("keydown", e => {
            if (e.isComposing) return;
            this.separator(e.key);
        });
    }

    actions(funcName: (string | null)) {
        switch(funcName) {
            case "clear":
                this.reset();
                break;
            case "clearScreen":
                this.screen.value = "0";
                break;
            case "clearSubresult":
                this.subresult.innerHTML = "";
                this.operations = "";
                break;
            case "dot":
                this.screen.value += ".";
                break;
            case "equal":
                this.showResult();
                break;
            case "negate":
                this.negate();
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
    }

    separator(key: string) {
        if(this.isCharDigit(key)) {
            this.addNumberOnScreen(key);
        } else {
            switch(key) {
                case "Backspace":
                    let length = this.screen.value.length;
                    this.screen.value = this.screen.value.substring(0, (length - 1));
                    break;
                case ".":
                    this.screen.value += key;
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

    addNumberOnScreen(param: any): void {

        if(this.clearSubresult) {
            this.subresult.innerHTML = this.screen.value;
            this.clearSubresult = false;
        }

        if(this.clearScreen) {
            this.screen.value = param;
            this.clearScreen = false;
        } else {
            this.screen.value += param;
        }
    }

    addSubresult(text: string, change: boolean = false) {

        if(change) this.subresult.innerHTML = text;
        else this.subresult.innerHTML += text;
    }

    addOperations(key: (string | null) = null) {
        if(this.screen.value === "") return;

        if(this.clearSubresult && !this.lastOperationsIsFunc) {
            this.addSubresult((this.screen.value + " " + key + " "), true);
            this.clearSubresult = false;
        } else if(this.lastOperationsIsFunc) {
            this.addSubresult(( " " + key + " "));
        } else {
            this.addSubresult(` ${this.screen.value} ${key} `);
        }

        if(this.lastOperationsIsFunc) {
            this.operations += key;
        } else {
            this.operations += this.screen.value + key;
        }

        this.clearScreen = true;
    }

    checkOperations(): string {
        let length: number = this.operations.length;
        let lastChar: string = this.operations.substring((length - 1));
        let temp: string;
        
        if(!this.isCharDigit(lastChar)) temp = this.operations.substr(0, (length - 1));
        else temp = this.operations;

        return temp;
    }

    negate() {
        let temp: number = parseFloat(this.screen.value);
        if(temp < 0) {
            this.screen.value = (Math.abs(temp)).toString();
        } else {
            this.screen.value = (-Math.abs(temp)).toString();
        }
    }

    reset(): void {
        this.screen.value = "0";
        this.operations = "";
        this.addSubresult("", true);
        this.clearScreen = true;
        this.clearSubresult = false;
        this.lastOperationsIsFunc = false;
    }

    pow(): void {
        let num: number;
        let temp: string;
        let content: string;

        if(this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        } else {
            num = parseFloat(this.screen.value);
        }

        if(this.lastOperationsIsFunc) content = `sqr(${this.subresult.innerHTML})`;
        else content = `sqr(${num})`;

        let operations = Math.pow(num, 2).toString();
        this.funcOperation(operations, content);
    }

    square(): void {
        let num: number;
        let temp: string;
        let content: string;

        if(this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        } else {
            num = parseFloat(this.screen.value);
        }

        if(this.lastOperationsIsFunc) content = `&#8730;(${this.subresult.innerHTML})`;
        else content = `&#8730;(${num})`;

        let operations = Math.sqrt(num).toString();
        this.funcOperation(operations, content);
    }

    onePerX(): void {
        let num: number;
        let temp: string;
        let content: string;

        if(this.screen.value === "") {
            temp = this.checkOperations();
            num = eval(temp);
        } else {
            num = parseFloat(this.screen.value);
        }

        if(this.lastOperationsIsFunc) content = `1/(${this.subresult.innerHTML})`;
        else content = `1/(${num})`;

        let operations = (1 / num).toString();
        this.funcOperation(operations, content);
    }

    funcOperation(func: string, content: string) {
          if(this.screen.value === this.subresult.innerHTML) {
            this.operations = "";
            this.subresult.innerHTML = "";
        }

        if(this.clearSubresult) {
            let lastChar: string =this.subresult.innerHTML.substr(this.subresult.innerHTML.length - 1);
            if(lastChar === "=") {
                this.operations = "";
                this.addSubresult("", true);
            } else {
                this.addSubresult(this.screen.value, true);
            }

            this.clearSubresult = false;
        }

        if(this.lastOperationsIsFunc) {
            this.operations = "";
            this.addSubresult(content, true)
        } else {
            this.addSubresult(content);
        }
        
        let result = func.toString();
        this.operations += result;
        this.screen.value = result;
        this.lastOperationsIsFunc = true;
    }


    showResult(): void {
        let lastChar = this.operations.substr(this.operations.length - 1);
        if(this.screen.value === "" && this.subresult.innerHTML.length == 0) return;

        if(!this.isCharDigit(lastChar)) {
            this.operations += this.screen.value;
            this.addSubresult(this.screen.value);
        }

        this.result = eval(this.operations);
        this.addSubresult(" =");
        this.screen.value = this.result.toString();
        this.operations = "";
        this.clearSubresult = true;
        this.lastOperationsIsFunc = false;
    }

    isCharDigit = (n: any) => !!n.trim() && n > -1;
}

new Calculator();