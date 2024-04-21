const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

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
  let result = a / b;
  return Math.round(result * 100) / 100;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function deleteNums() {
  let displayValue = display.textContent;
  if (displayValue.length === 1 || displayValue === "Error") {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  display.textContent = displayValue;
}

function appendNumber(number) {
  let displayValue = display.textContent;

  if (displayValue === "Error: Division by zero") {
    clearDisplay();
    displayValue = "0";
  }

  if (displayValue === "0" && number === 0) {
    return;
  }

  if (displayValue === "0" || displayValue === "Error") {
    displayValue = number.toString();
  } else {
    displayValue += number;
  }

  display.textContent = displayValue;
}

function appendDecimal() {
  let displayValue = display.textContent;
  if (!displayValue.includes(".") && !displayValue.includes("Error")) {
    displayValue += ".";
  }
  display.textContent = displayValue;
}

let firstNumber = "";
let operation = "";

function operatePressed(operator) {
  let displayValue = display.textContent;
  if (displayValue.includes("Error")) {
    clearDisplay();
    display.textContent = "0";
  }

  if (displayValue === "" || operation !== "") {
    return;
  }

  firstNumber = parseFloat(displayValue);
  operation = operator;

  display.textContent += " " + operator + " ";
}

function equalsPressed() {
  let displayValue = display.textContent;

  if (displayValue === "Error: Division by zero") {
    clearDisplay();
    return;
  }

  if (operation === "" || displayValue === "") {
    return;
  }

  let displayParts = displayValue.split(" ");
  let operator = displayParts[1];
  let secondNumber = parseFloat(displayParts[2]);

  let result;

  if (isNaN(secondNumber)) {
    display.textContent = firstNumber;
    firstNumber = "";
    operation = "";
    return;
  } else if (operator === "/" && secondNumber === 0) {
    display.textContent = "Error: Division by zero";
    return;
  } else {
    result = operate(operator, firstNumber, secondNumber);
  }
  result = parseFloat(result.toFixed(4));
  display.textContent = result;

  firstNumber = "";
  operation = "";
}

clearDisplay();

window.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(parseInt(key))) {
    appendNumber(parseInt(key));
  }

  if (display.textContent === "Error: Division by zero") {
    clearDisplay();
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    operatePressed(key);
  }

  if (key === "Escape") {
    clearDisplay();
  }

  if (key === "Enter") {
    equalsPressed();
  }

  if (key === "Delete" || key === "Backspace") {
    deleteNums();
  }

  if (key === ".") {
    appendDecimal();
  }
});
