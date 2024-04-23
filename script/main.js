const displayPreviousValue = document.getElementById("previous-value");
const displayCurrentValue = document.getElementById("current-value");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const display = {
  currentValue: "",
  previousValue: "",
  operationType: undefined,
  operators: {
    add: "+",
    divide: "/",
    multiply: "x",
    subtract: "-",
  },
  calculator: {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    divide: (num1, num2) => num1 / num2,
    multiply: (num1, num2) => num1 * num2,
  },
  clear() {
    if (this.currentValue === "") {
      this.operationType = undefined;
      this.currentValue = this.previousValue;
      this.previousValue = "";
    } else {
      this.currentValue = this.currentValue.slice(0, -1);
    }
    this.printValues();
  },
  clearAll() {
    this.currentValue = "";
    this.previousValue = "";
    this.operationType = undefined;
    this.printValues();
  },
  compute(operator) {
    this.operationType !== "equals" && this.calculate();
    this.operationType = operator;
    this.previousValue = this.currentValue || this.previousValue;
    this.currentValue = "";
    this.printValues();
  },
  addNumber(number) {
    if (this.currentValue === "" && number === ".") return;
    if (number === "." && this.currentValue.includes(".")) return;
    const decimalIndex = this.currentValue.indexOf(".");
    if (decimalIndex !== -1 && this.currentValue.length - decimalIndex > 4) {
      return;
    }

    this.currentValue = this.currentValue.toString() + number.toString();
    this.printValues();
  },
  printValues() {
    displayCurrentValue.textContent = this.currentValue;
    displayPreviousValue.textContent = `${this.previousValue} ${this.operators[this.operationType] || ""
      }`;
  },
  calculate() {
    const previousValue = parseFloat(this.previousValue);
    const currentValue = parseFloat(this.currentValue);

    if (isNaN(currentValue) || isNaN(previousValue)) return;
    let result = this.calculator[this.operationType](
      previousValue,
      currentValue
    );
    result = Math.round(result * 10000) / 10000;

    if (this.operationType === "divide") {
      result = Math.round(result * 100) / 100; // Round to 2 decimal places
    }
    this.currentValue = result.toString();
  },
};

numberButtons.forEach((button) => {
  button.addEventListener("click", () => display.addNumber(button.innerHTML));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => display.compute(button.value));
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const keyCode = event.keyCode;

  if (!isNaN(key) && key !== " ") {
    display.addNumber(parseInt(key));
  } else if (key === "." || keyCode === 190 || keyCode === 110) {
    display.addNumber(".");
  }

  if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    keyCode === 187 ||
    keyCode === 189 ||
    keyCode === 88 ||
    keyCode === 191
  ) {
    if (key === "+") display.compute("add");
    else if (key === "-") display.compute("subtract");
    else if (key === "*") display.compute("multiply");
    else if (key === "/") display.compute("divide");
    else if (keyCode === 187) display.compute("add");
    else if (keyCode === 189) display.compute("subtract");
    else if (keyCode === 88) display.compute("multiply");
    else if (keyCode === 191) display.compute("divide");
  }

  if (key === "Escape") {
    display.clearAll();
  }

  if (key === "Backspace" || key === "Delete") {
    display.clear();
  }
});

document.addEventListener("keypress", (event) => {
  const key = event.key;

  if (key === "Enter") {
    display.compute("equals");
  }
});
