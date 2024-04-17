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
  return a / b;
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
  console.log(displayValue);
}

function appendNumber(number) {
  let displayValue = display.textContent;

  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  display.textContent = displayValue;
}
function appendDecimal() {
  let displayValue = display.textContent;
  displayValue += ".";
  display.textContent = displayValue;
}

let firstNumber = "";
let operation = "";

function operatePressed(operator) {
  let displayValue = display.textContent;

  // Check if the operator is deleted
  if (operator === "") {
    // Update the operation without evaluating the previous operation
    operation = operator;
    display.textContent = displayValue.slice(0, -2); // Remove the deleted operator from display
    return; // Exit the function
  }

  // If there's already an operation in progress, evaluate the previous operation
  if (operation !== "" && displayValue !== "") {
    equalsPressed();
  }

  firstNumber = parseFloat(displayValue);
  operation = operator;
  display.textContent += " " + operator + " ";
}

function equalsPressed() {
  let displayValue = display.textContent;

  // Split the display value to get the second number
  let displayParts = displayValue.split(operation);

  // Check if the split operation produced at least two parts
  if (displayParts.length < 2) {
    // Handle the case where the second number is missing
    console.error("Invalid expression: Missing second number");
    return;
  }

  // Extract the second number and trim any whitespace
  let secondNumber = parseFloat(displayParts[1].trim());

  // Calculate the result
  let result = operate(operation, firstNumber, secondNumber);
  display.textContent = result;
  firstNumber = "";
  operation = "";
}

// Call the clearDisplay function to initialize the display
clearDisplay();
