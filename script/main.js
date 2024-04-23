const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".number, .operator");
const dotButton = document.querySelector("#dot");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector("#equals");

let expression = [];
let displayValue = "0";
let lastNumber = "";
let override = true;

// Math Functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}
function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
function calculate() {
  let result = operate(expression[1], +expression[0], +expression[2]);
  if (result === "Error: Division by zero") {
    alert("Error: Division by zero");
    expression.pop();
    lastNumber = "";
    displayValue = displayValue.slice(0, -1);
    return displayValue;
  }
  result = Math.round(result * 100) / 100;
  expression = [result];
  lastNumber = `${result}`;
  displayValue = `${result}`;

  return result;
}

// Functions
function clear() {
  expression = [];
  displayValue = "0";
  lastNumber = "";
  override = true;
  updateDisplay();
}
function updateDisplay() {
  display.textContent = displayValue;
}
function handleClick(button) {
  if (button.classList.contains("number")) {
    handleNumberClick(button.textContent.trim());
  } else if (button.classList.contains("operator")) {
    handleOperatorClick(button.textContent.trim());
  }
}
function handleNumberClick(number) {
  if (override) {
    expression.pop();
    displayValue = "";
    lastNumber = "";
    override = false;
  }

  if (lastNumber.includes(".") && lastNumber.split(".")[1].length === 3) {
    return;
  }

  if (lastNumber === "0" && number === "0") {
    return;
  }

  if (lastNumber !== "") expression.pop();

  lastNumber += number;
  expression.push(lastNumber);

  displayValue += number;
  updateDisplay();
}

function handleOperatorClick(operator) {
  if (override) override = false;

  if (expression.length === 3) {
    calculate();
  }
  if (expression.length > 0) {
    if (lastNumber === "") {
      expression.pop();
      displayValue = displayValue.slice(0, -1);
    }
    expression.push(operator);
  } else expression.push(0, operator);

  lastNumber = "";
  displayValue += operator;
  updateDisplay();
}
function handleDotClick() {
  if (override) override = false;
  if (
    lastNumber.toString().indexOf(".") === -1 &&
    (lastNumber !== "" || expression.length === 0)
  ) {
    lastNumber += ".";
    displayValue += ".";
  }
  if (lastNumber !== "") {
    expression.pop();
    expression.push(lastNumber);
  }

  updateDisplay();
}
function handleDeleteClick() {
  if (lastNumber.toString().length > 1 && +lastNumber > 0) {
    lastNumber = lastNumber.toString().slice(0, -1);
    expression[expression.length - 1] = lastNumber;
  } else if (lastNumber < 0 && lastNumber > -10) {
    lastNumber = lastNumber.toString().slice(0, -2);
    displayValue = displayValue.toString().slice(0, -2);
    expression.pop();
  } else {
    expression.pop();
    lastNumber = +expression[expression.length - 1] || "";
  }

  override = false;
  displayValue = displayValue.toString().slice(0, -1);
  updateDisplay();
}
function handleEqualsClick() {
  if (expression.length === 3) {
    displayValue = calculate();
    override = true;
  }
  updateDisplay();
}

// Event Listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => handleClick(button));
});
dotButton.addEventListener("click", handleDotClick);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", handleDeleteClick);
equalsButton.addEventListener("click", () => handleEqualsClick());

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) handleNumberClick(e.key);
  else if (e.key === ".") handleDotClick();
  else if (e.key === "Backspace") handleDeleteClick();
  else if (e.key === "Enter" || e.key === "=") handleEqualsClick();
  else if (e.key === "Escape") clear();
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    handleOperatorClick(e.key);
});
