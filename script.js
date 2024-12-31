"use strict";

// === Globale variable ===//

let firstOperand = null;
let secondOperand = null;
let operator = null;

let buffer = [];

// === DOM references === //

const display = document.querySelector(".calc-input");
const btnsContainer = document.querySelector(".btns-cont");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".opr-btn");
const assignBtn = document.querySelector(".assig-btn");
const utilityBtns = document.querySelectorAll(".utility-btn");
const oprIndicatorDisplay = document.querySelector(".opr-indicator");

// === Event listeners === //

utilityBtns.forEach((btn) => {
  btn.addEventListener("click", handleUtiliBtn);
});

numButtons.forEach((btn) => {
  btn.addEventListener("click", handleNumBtn);
});
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", handleOperatoerBtn);
});

btnsContainer.addEventListener("click", (e) => {
  console.log(buffer);
  console.log("first: " + firstOperand);
  console.log("second: " + secondOperand);
  console.log("operator: " + operator);
});

assignBtn.addEventListener("click", (e) => {
  if (firstOperand != null && operator != null && buffer.length > 0) {
    secondOperand = parseFloat(buffer.join(""));
    clearBuffer();
    let finalResult =
      Math.round(operate(firstOperand, operator, secondOperand) * 10000) /
      10000;

    if (isNaN(finalResult)) {
      showDivisionError();
      updateDisplay(buffer);
      clearBuffer();
      clearData();
      return;
    }

    buffer.push(finalResult);
    updateDisplay(buffer);

    clearBuffer();
    clearData();
  }
});

// === Event handlers === //

function handleNumBtn(e) {
  buffer.push(+e.target.textContent);
  updateDisplay(buffer);
}

function handleOperatoerBtn(e) {
  let button = e.target.textContent;
  if (firstOperand == null && buffer.length > 0) {
    firstOperand = parseFloat(buffer.join(""));
    operator = button;
    clearBuffer();
    updateOperDisplay();
    return;
  }

  if (buffer.length > 0 && operator != null && firstOperand != null) {
    secondOperand = parseFloat(buffer.join(""));
    buffer = [];
  }

  if (firstOperand != null && secondOperand != null && operator != null) {
    let solvedResult =
      Math.round(operate(firstOperand, operator, secondOperand) * 10000) /
      10000;

    if (isNaN(solvedResult)) {
      showDivisionError();
      updateDisplay(buffer);
      clearBuffer();
      clearData();
      return;
    }

    buffer.push(solvedResult);
    updateDisplay(buffer);

    firstOperand = parseFloat(buffer.join(""));
    clearBuffer();
    secondOperand = null;
  }
  if (buffer.length === 0 && display.value.length > 0) {
    operator = button;
  }
  updateOperDisplay();
}

function handleUtiliBtn(e) {
  let button = e.target.textContent;
  if (button === "<" && buffer.length !== 0) {
    buffer.pop();
    updateDisplay(buffer);
  }
  if (button === "AC") {
    clearDisplay();
    clearData();
    clearBuffer();
  } else if (button === "+/-") {
    if (buffer.length === 0) return;
    buffer[0] = -buffer[0];
    updateDisplay(buffer);
  } else if (button === "%") {
    if (buffer.length === 0) return;
    if (!isNaN(display.value)) buffer = [parseFloat(buffer.join("")) / 100];
    updateDisplay(buffer);
  }
}

// === Helper function === //

function updateOperDisplay() {
  oprIndicatorDisplay.textContent = operator;
}

function operate(a, opr, b) {
  if (opr === "/" && b === 0) {
    return "error";
  }
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

function showDivisionError() {
  buffer = ["can't divid by 0"];
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
  updateOperDisplay();
}
function clearBuffer() {
  buffer = [];
}

console.log(Math.round("ei" * 10) / 10);
