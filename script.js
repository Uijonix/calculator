"use strict";

// === Globale variable ===//

let firstOperand = null;
let secondOperand = null;
let operator = null;

let result = null;

// === DOM references === //

const display = document.querySelector(".calc-input");
const btnsContainer = document.querySelector(".btns-cont");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".opr-btn");
const assignBtn = document.querySelector(".assig-btn");
const utilityBtns = document.querySelectorAll(".utility-btn");
const oprIndicatorDisplay = document.querySelector(".opr-indicator");
const dotBtn = document.querySelector(".dot-btn");

// === Event listeners === //

utilityBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let button = e.target.textContent;
    if (button === "<" && display.value !== "") {
      let value = [...display.value];
      value.pop();
      display.value = value.join("");
    }
    if (button === "AC") {
      clearDisplay();
      clearData();
    } else if (button === "+/-" && display.value !== "") {
      display.value = -display.value;
    } else if (button === "%" && display.value != "") {
      if (!isNaN(display.value)) {
        display.value = parseFloat(display.value) / 100;
      }
    }
  });
});

numButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (display.value.includes("can't")) clearDisplay();
    if (
      secondOperand !== null &&
      firstOperand !== null &&
      operator !== null &&
      display.value !== ""
    ) {
      firstOperand = parseFloat(display.value);
      clearDisplay();
      secondOperand = null;
    }
    display.value += e.target.textContent;
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (display.value === "") return;

    if (firstOperand === null && display.value !== "") {
      firstOperand = parseFloat(display.value);
    }

    if (operator === null && firstOperand !== null) {
      operator = e.target.textContent;
      clearDisplay();
      updateOperDisplay();
      return;
    }

    if (secondOperand === null && firstOperand !== null && operator !== null) {
      secondOperand = parseFloat(display.value);

      result = getResult();

      if (isNaN(result)) {
        showDivisionError();
        clearData();
        return;
      }

      display.value = result;
      operator = e.target.textContent;
      updateOperDisplay();
    }
  });
});

btnsContainer.addEventListener("click", (e) => {
  console.log("first: " + firstOperand);
  console.log("second: " + secondOperand);
  console.log("operator: " + operator);
});

assignBtn.addEventListener("click", (e) => {
  if (
    secondOperand === null &&
    firstOperand !== null &&
    operator !== null &&
    display.value !== ""
  ) {
    secondOperand = parseFloat(display.value);
    result = getResult();

    if (isNaN(result)) {
      showDivisionError();
      clearData();
      return;
    }

    display.value = result;
    clearData();
  }
});

dotBtn.addEventListener("click", (e) => {
  if(display.value.includes("."))return;

  display.value += e.target.textContent;
})

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
  }
}

function showDivisionError() {
  display.value = "can't divid by 0";
}

function getResult() {
  return (
    Math.round(operate(firstOperand, operator, secondOperand) * 10000) / 10000
  );
}

function clearDisplay() {
  display.value = "";
}

function clearData() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  oprIndicatorDisplay.textContent = "";
}
