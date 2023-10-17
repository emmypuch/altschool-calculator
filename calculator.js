const display = document.getElementById("display");
const basicCalculatorButtons = document.querySelectorAll(
  ".number, .operator, .calculate, .clear"
);
const toggleScientificButton = document.querySelector(".toggle-scientific");
const scientificCalculator = document.querySelector(".scientific-calculator");
const scientificButtons = document.querySelectorAll(".function");

let currentValue = "0";
let operator = "";
let storedValue = null;

function updateDisplay() {
  display.value = currentValue;
}

function calculate() {
  if (operator && storedValue !== null) {
    switch (operator) {
      case "+":
        currentValue = (
          parseFloat(storedValue) + parseFloat(currentValue)
        ).toString();
        break;
      case "-":
        currentValue = (
          parseFloat(storedValue) - parseFloat(currentValue)
        ).toString();
        break;
      case "*":
        currentValue = (
          parseFloat(storedValue) * parseFloat(currentValue)
        ).toString();
        break;
      case "/":
        if (currentValue === "0") {
          currentValue = "Error";
        } else {
          currentValue = (
            parseFloat(storedValue) / parseFloat(currentValue)
          ).toString();
        }
        break;
      case "%":
        currentValue = (
          parseFloat(storedValue) % parseFloat(currentValue)
        ).toString();
        break;
    }
    operator = "";
    storedValue = null;
  }
}

basicCalculatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    const buttonOperator = button.getAttribute("data-operator");

    if (buttonValue) {
      if (currentValue === "0" || currentValue === "Error") {
        currentValue = buttonValue;
      } else {
        currentValue += buttonValue;
      }
      updateDisplay();
    } else if (buttonOperator) {
      if (buttonOperator === "=") {
        calculate();
        updateDisplay();
      } else if (buttonOperator === "C") {
        currentValue = "0";
        operator = "";
        storedValue = null;
        updateDisplay();
      } else {
        if (operator === "") {
          storedValue = currentValue;
          currentValue = "0";
        }
        operator = buttonOperator;
      }
    }
  });
});

toggleScientificButton.addEventListener("click", () => {
  scientificCalculator.classList.toggle("hidden");
});

// The existing calculator code (as provided earlier) for basic operations.

scientificButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const functionType = button.getAttribute("data-function");
    switch (functionType) {
      case "sqrt":
        currentValue = Math.sqrt(parseFloat(currentValue)).toString();
        break;
      case "square":
        currentValue = (
          parseFloat(currentValue) * parseFloat(currentValue)
        ).toString();
        break;
      case "cube":
        currentValue = (
          parseFloat(currentValue) *
          parseFloat(currentValue) *
          parseFloat(currentValue)
        ).toString();
        break;
      case "sin":
        currentValue = Math.sin(parseFloat(currentValue)).toString();
        break;
      case "cos":
        currentValue = Math.cos(parseFloat(currentValue)).toString();
        break;
      case "tan":
        currentValue = Math.tan(parseFloat(currentValue)).toString();
        break;
      case "log":
        currentValue = Math.log10(parseFloat(currentValue)).toString();
        break;
    }
    updateDisplay();
  });
});
