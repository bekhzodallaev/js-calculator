const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".number, .operator");
const dot_button = document.querySelector("#dot");
const clear_button = document.querySelector("#clear");
const delete_button = document.querySelector("#delete");
const equals_button = document.querySelector("#equals");

let expression = [];
let display_value = "0";
let last_number = "";
let override = true;

// ### Math Functions ###
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
    expression.pop();
    last_number = "";
    display_value = display_value.slice(0, -1);
    return display_value;
  }
  result = Math.round(result * 100) / 100;
  expression = [result];
  last_number = `${result}`;
  display_value = `${result}`;

  return result;
}

// ### UI Functions ###
function clear() {
  expression = [];
  display_value = "0";
  last_number = "";
  override = true;
  updateDisplay();
}
function updateDisplay() {
  display.textContent = display_value;
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
    display_value = "";
    last_number = "";
    override = false;
  }

  if (last_number.includes(".") && last_number.split(".")[1].length === 3) {
    return;
  }

  if (last_number === "0" && number === "0") {
    return;
  }

  if (last_number !== "") expression.pop();

  last_number += number;
  expression.push(last_number);

  display_value += number;
  updateDisplay();
}

function handleOperatorClick(operator) {
  if (override) override = false;

  if (expression.length === 3) {
    calculate();
  }
  if (expression.length > 0) {
    if (last_number === "") {
      expression.pop();
      display_value = display_value.slice(0, -1);
    }
    expression.push(operator);
  } else expression.push(0, operator);

  last_number = "";
  display_value += operator;
  updateDisplay();
}
function handleDotClick() {
  if (override) override = false;
  if (
    last_number.toString().indexOf(".") === -1 &&
    (last_number !== "" || expression.length === 0)
  ) {
    last_number += ".";
    display_value += ".";
  }
  if (last_number !== "") {
    expression.pop();
    expression.push(last_number);
  }

  updateDisplay();
}
function handleDeleteClick() {
  if (last_number.toString().length > 1 && +last_number > 0) {
    last_number = last_number.toString().slice(0, -1);
    expression[expression.length - 1] = last_number;
  } else if (last_number < 0 && last_number > -10) {
    last_number = last_number.toString().slice(0, -2);
    display_value = display_value.toString().slice(0, -2);
    expression.pop();
  } else {
    expression.pop();
    last_number = +expression[expression.length - 1] || "";
  }

  override = false;
  display_value = display_value.toString().slice(0, -1);
  updateDisplay();
}
function handleEqualsClick() {
  if (expression.length === 3) {
    display_value = calculate();
    override = true;
  }
  updateDisplay();
}

// ### Event Listeners ###
buttons.forEach((button) => {
  button.addEventListener("click", () => handleClick(button));
});
dot_button.addEventListener("click", handleDotClick);
clear_button.addEventListener("click", clear);
delete_button.addEventListener("click", handleDeleteClick);
equals_button.addEventListener("click", () => handleEqualsClick());

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) {
    handleNumberClick(e.key);
  } else if (e.key === ".") {
    handleDotClick();
  } else if (e.key === "Backspace") {
    handleDeleteClick();
  } else if (e.key === "Enter" || e.key === "=") {
    handleEqualsClick();
  } else if (e.key === "Escape") {
    clear();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperatorClick(e.key);
  }
});
