var Calculator = /** @class */ (function () {
    function Calculator() {
        var _this = this;
        this.screen = document.getElementById("screenInput");
        this.subResult = document.getElementById("sub-result");
        this.result = 0;
        this.isCharDigit = function (n) { return !!n.trim() && n > -1; };
        document.querySelectorAll("span[data-type='number']").forEach(function (item) {
            item.addEventListener('click', function (e) { return _this.addNumber(item.textContent); });
        });
        document.addEventListener("keydown", function (e) {
            if (e.isComposing)
                return;
            if (e.key === "Enter") {
                _this.showResult();
            }
            if (_this.isCharDigit(e.key)) {
                _this.addNumber(e.key);
            }
            else {
                _this.addOperator(e.key);
            }
        });
    }
    Calculator.prototype.addNumber = function (item) {
        if (this.screen.value === "0") {
            this.screen.value = item;
        }
        else {
            this.screen.value += item;
        }
    };
    Calculator.prototype.addOperator = function (key) {
        switch (key) {
            case ",":
                this.screen.value += key;
                break;
            case "+":
                this.result += parseFloat(this.screen.value);
                this.subResultCalc(key);
                break;
            case "-":
                this.result -= parseFloat(this.screen.value);
                this.subResultCalc(key);
                break;
            case "*":
                this.result *= parseFloat(this.screen.value);
                this.subResultCalc(key);
                break;
            case "/":
                this.result /= parseFloat(this.screen.value);
                this.subResultCalc(key);
                break;
        }
    };
    Calculator.prototype.subResultCalc = function (key) {
        this.subResult.innerHTML += this.screen.value + " " + key + " ";
        this.screen.value = "";
    };
    Calculator.prototype.showResult = function () {
        this.screen.value = this.result;
    };
    return Calculator;
}());
new Calculator();
