class Calculator {
    screen: HTMLInputElement = <HTMLInputElement>document.getElementById("screenInput");
    subResult: HTMLDivElement = <HTMLDivElement>document.getElementById("sub-result");
    result: number = 0;

    constructor() {
        document.querySelectorAll("span[data-type='number']").forEach(item => {
            item.addEventListener('click', (e: Event) => this.addNumber(item.textContent));
          });

          document.addEventListener("keydown", e => {
            if (e.isComposing) return;

            if(this.isCharDigit(e.key)) {
                this.addNumber(e.key);
            } else {
                this.addOperator(e.key);
            }
            
          });

    }

    addNumber(item: any): void {

        if(this.screen.value === "0") {
            this.screen.value = item;
        } else {
            this.screen.value += item;
        }
    }

    addOperator(key: any): void {
        switch(key) {
            case ",":
                this.screen.value += key;
                break;
            case "+":
                this.subResultCalc(key);
                break;
            case "-":
                this.subResultCalc(key);
                break;
            case "*":
                this.subResultCalc(key);
                break;
            case "/":
                this.subResultCalc(key);
                
                break;
        }
    }

    subResultCalc(key: any): void {
        this.subResult.innerHTML += this.screen.value + " " + key;
        this.screen.value = "";
    }

    isCharDigit = (n) => !!n.trim() && n > -1;

    // showResult() {
    //     this.screen.value = this.result;
    // }
}

new Calculator();