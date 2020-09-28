//import Operations from './Operations';
//var op = new Operations();

class Calculator {
    screen: HTMLInputElement = <HTMLInputElement>document.getElementById("screenInput");
    subResult: HTMLDivElement = <HTMLDivElement>document.getElementById("sub-result");
    result: number = 0;
    operations: string = "";

    constructor() {
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', (e: Event) => this.addNumber(item.textContent));
          });

          document.addEventListener("keydown", e => {
            if (e.isComposing) return;

            if(e.key === "Enter") {
                this.showResult();
            }

            if(this.isCharDigit(e.key)) {
                this.addNumber(e.key);
            } else {
                switch(e.key) {
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

    addNumber(param: any): void {

        if(this.screen.value === "0") {
            this.screen.value = param;
        } else {
            this.screen.value += param;
        }
    }

    cleanScreen(key: string): void {
        this.subResult.innerHTML += this.screen.value + " " + key + " ";
        this.operations += this.screen.value + key;
        this.screen.value = "";
        console.log(this.operations);
    }

    isCharDigit = (n: any) => !!n.trim() && n > -1;

    showResult(): void {
        if(this.screen.value === "") return;

        this.operations += this.screen.value;
        this.result = eval(this.operations);
        this.screen.value = <any>this.result;
        this.operations = <any>this.result;
    }
}

new Calculator();