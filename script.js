"use strict";

let firstOperand = null;
let secondOperand = null;
let operator = null;

const buffer = [];

const operators = "-*+/";
const acceptedDisplayValues = "1234567890.";

const display = document.querySelector(".calc-input");
const btnsContainer = document.querySelector(".btns-cont");

btnsContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const buttonValue = e.target.textContent;

  if (buttonValue === "AC") {
    clearDisplay();
  }

  if (buttonValue === "=") {
    return;
  }

  if (acceptedDisplayValues.includes(buttonValue)) {
    buffer.push(buttonValue);
    updateDisplay(buffer);
  }

  if (operators.includes(buttonValue)) {
    if (!firstOperand) {
      firstOperand = +buffer.splice(0, Infinity).join("");
    }

    if (firstOperand && !secondOperand) {
      secondOperand = +buffer.splice(0, Infinity).join("");
    }

    if (firstOperand && secondOperand && operator) {
      buffer.push(operate(firstOperand, operator, secondOperand));
      updateDisplay(buffer);
      operator = null;
      secondOperand = null;
      buffer.splice(0, Infinity);
    }
    operator = buttonValue;
  }

  console.log(buffer);
  console.log("first: " + firstOperand);
  console.log("second: " + secondOperand);
  console.log("operator: " + operator);
});

function operate(a, opr, b) {
  switch (opr) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      console.log("No match!");
  }
}

function updateDisplay(arr) {
  display.value = arr.join("");
}

function clearDisplay() {
  display.value = "";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  buffer.splice(0, Infinity);
}
