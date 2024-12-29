"use strict";

// == DOM References ===
const display = document.querySelector(".calc-input");
const calcCont = document.querySelector(".calc-cont");

const calculator = {
  expression: "",

  firstNum: 0,
  secondNum: 0,

  acceptedValues: "0123456789./*-+",

  add() {
    return this.firstNum + this.secondNum;
  },
  subtract() {
    return this.firstNum - this.secondNum;
  },
  multiply() {
    this.firstNum * this.secondNum;
  },
  divide() {
    this.firstNum / this.secondNum;
  },
  clearDisplay() {
    display.value = "";
  },
  populateDisplay(btn) {
    display.value += btn;
  },
};
// == Event Handlers ==
calcCont.addEventListener("click", (e) => {
  let button = e.target.textContent;
  let operators = "/*-+";
  let lastDisplayValue = display.value.at(-1);

  if (
    e.target.tagName.toLowerCase() !== "button" ||
    (button === "." && display.value.includes(".")) ||
    (operators.includes(button) && !Number.isInteger(+lastDisplayValue))
  )
    return;

  if (button === "AC" && display.value !== "") {
    calculator.clearDisplay();
  }

  if (button === "=" && display.value !== "") {
    if (operators.includes(lastDisplayValue)) return;
    calculator.expression = display.value;
  }

  if (calculator.acceptedValues.includes(button)) {
    calculator.populateDisplay(button);
  }
});

// == Helper Functions ==

// console.log(!isNaN(NaN))
