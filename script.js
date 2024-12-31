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
  const buttonValue = e.target.textContent;
  if (
    e.target.tagName !== "BUTTON" ||
    (buttonValue === "." && display.value.includes(buttonValue))
  ) {
    return;
  }

  if (buttonValue === "=") {
    if (firstOperand && !secondOperand && operator) {
      secondOperand = getOperand();
      calculate();
      clearData();
    }
    return;
  }

  if (buttonValue === "AC" && display.value !== "") {
    clearDisplay();
    clearData();
  }

  if (acceptedDisplayValues.includes(buttonValue)) {
    buffer.push(buttonValue);
    updateDisplay(buffer);
  }

  if (operators.includes(buttonValue)) {
    if (!firstOperand) {
      firstOperand = getOperand();
    }

    if (firstOperand && !secondOperand) {
      secondOperand = getOperand();
    }

    if (firstOperand && secondOperand && operator) {
      calculate();
    }
    operator = buttonValue;
  }

  console.log(buffer);
  console.log("first: " + firstOperand);
  console.log("second: " + secondOperand);
  console.log("operator: " + operator);
});

function calculate() {
  let finalResult =
    Math.round(operate(firstOperand, operator, secondOperand) * 100000) /
    100000;

  buffer.push(finalResult);

  updateDisplay(buffer);
  firstOperand = getOperand();

  operator = null;
  secondOperand = null;
  buffer.splice(0, Infinity);
}

function getOperand() {
  return +buffer.splice(0, Infinity).join("");
}

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
}

function clearData() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  buffer.splice(0, Infinity);
}

// console.log(2.toFixed(6))
