class Calculator {
    screen: HTMLInputElement = <HTMLInputElement>document.getElementById("screenInput");
    subresult: HTMLDivElement = <HTMLDivElement>document.getElementById("sub-result");
    result: number = 0;
    operations: string = "";
    clearSubresult: boolean = false;

    constructor() {
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', _ => this.addNumber(item.textContent));
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
                break;
            case "pow":
                this.square(parseFloat(this.screen.value));
                break;
        }
    }

    separator(key: string) {
        if(this.isCharDigit(key)) {
            this.addNumber(key);
        } else {
            switch(key) {
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
                    this.screen.value += key;
                    break;
                case "+":
                    this.cleanScreen(key);
                    break;
                case "-":
                    this.cleanScreen(key);
                    break;
                case "*":
                    this.cleanScreen(key);
                    break;
                case "/":
                    this.cleanScreen(key);
                    break;
            }
        }
    }

    addNumber(param: any): void {

        if(this.screen.value === "0") {
            this.screen.value = param;
        } else {
            this.screen.value += param;
        }
    }

    cleanScreen(key: string): void {
        if(this.screen.value === "") return;

        if(this.clearSubresult) {
            this.subresult.innerHTML = "";
            this.clearSubresult = false;
        }

        this.subresult.innerHTML += parseFloat(this.screen.value) + " " + key + " ";
        this.operations += this.screen.value + key;
        this.screen.value = "";
    }

    isCharDigit = (n: any) => !!n.trim() && n > -1;

    showResult(): void {
        if(this.screen.value === "" && this.subresult.innerHTML.length == 0) return;

        this.operations += this.screen.value;
        this.checkResult();
        this.subresult.innerHTML += this.screen.value + " =";
        this.screen.value = this.result.toString();
        this.operations = "";
        this.clearSubresult = true;
    }

    checkResult(): void {
        let length: number = this.operations.length;
        let subresultLegth: number = this.subresult.innerHTML.length;
        let lastChar: string = this.operations.substring((length - 1));
        
        if(!this.isCharDigit(lastChar) && this.screen.value === "") {
            this.operations = this.operations.substr(0, (length - 1));
            this.subresult.innerHTML = this.subresult.innerHTML.substr(0, (subresultLegth - 2));
        }

        this.result = eval(this.operations);
    }

    reset(): void {
        this.screen.value = "0";
        this.operations = "";
        this.subresult.innerHTML = "";
    }

    square(num: number) {
        this.subresult.innerHTML += `sqr(${parseFloat(this.screen.value)})`;
        this.screen.value = Math.pow(num, 2).toString();
    }
}

new Calculator();