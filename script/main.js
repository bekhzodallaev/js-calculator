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

    if (displayValue === "Error: Division by zero") {
        clearDisplay();
        displayValue = "0";
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
    displayValue += ".";
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


// Call the clearDisplay function to initialize the display
clearDisplay();

// KEYBOARD SUPPORT
window.addEventListener("keydown", function (event) {
    const key = event.key;

    // If a number key is pressed, append the corresponding number to the display
    if (!isNaN(parseInt(key))) {
        appendNumber(parseInt(key));
    }

    if (display.textContent === "Error: Division by zero") {
        clearDisplay();
    }

    // If an operator key is pressed, perform the corresponding operation
    if (key === "+" || key === "-" || key === "*" || key === "/") {
        operatePressed(key);
    }

    if (key === "Escape") {
        clearDisplay();
    }

    // If the Enter key is pressed, calculate the result
    if (key === "Enter") {
        equalsPressed();
    }

    // If the Delete or Backspace key is pressed, delete the last character
    if (key === "Delete" || key === "Backspace") {
        deleteNums();
    }

    // If the Decimal key is pressed, append a decimal point
    if (key === ".") {
        appendDecimal();
    }
});
