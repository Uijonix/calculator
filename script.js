'use strict';

// === Globale variable ===//

let firstOperand = null;
let secondOperand = null;
let operator = null;

let result = null;

let clickedEqualBtn = false;

// === DOM references === //

const display = document.querySelector('.calc-input');
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.opr-btn');
const assignBtn = document.querySelector('.assig-btn');
const utilityBtns = document.querySelectorAll('.utility-btn');
const oprIndicatorDisplay = document.querySelector('.opr-indicator');
const dotBtn = document.querySelector('.dot-btn');


// === Event listeners === //

utilityBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let button = e.target.textContent;
    if (button === '<' && display.value !== '') {
      if(display.value.length === 1) oprIndicatorDisplay.textContent = "";

      let value = [...display.value];
      value.pop();
      display.value = value.join('');
    }
    if (button === 'AC') {
      clearDisplay();
      clearData();
    } else if (
      button === '+/-' &&
      display.value !== '' &&
      display.value !== '.'
    ) {
      display.value = -display.value;
    } else if (button === '%' && display.value != '') {
      if (!isNaN(display.value)) {
        display.value = parseFloat(display.value) / 100;
      }
    }
  });
});

numButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if(e.target.textContent === "0" && display.value === "0") return;
    if (display.value.includes("can't")) clearDisplay();
    if (clickedEqualBtn) {
      clearDisplay();
      toggleClickedEqualBtn();

      oprIndicatorDisplay.textContent = '';
    }

    if (
      secondOperand !== null &&
      firstOperand !== null &&
      operator !== null &&
      display.value !== ''
    ) {
      firstOperand = parseFloat(display.value);
      clearDisplay();
      secondOperand = null;
    }
    display.value += e.target.textContent;
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (display.value === '') return;

    if (firstOperand === null && display.value !== '') {
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

      // If result variable ends up  being NaN display division message.
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

assignBtn.addEventListener('click', (e) => {
  if (
    secondOperand === null &&
    firstOperand !== null &&
    operator !== null &&
    display.value !== ''
  ) {
    secondOperand = parseFloat(display.value);
    result = getResult();

    // If result variable ends up  being NaN display division message.
    if (isNaN(result)) {
      showDivisionError();
      clearData();
      return;
    }

    display.value = result;
    clearData();
    oprIndicatorDisplay.textContent = '=';
    toggleClickedEqualBtn();
  }
});

dotBtn.addEventListener('click', (e) => {
  if (display.value.includes('.')) return;

  display.value += e.target.textContent;
});

document.addEventListener('keyup', (e) => {
  // custom event to click buttons when keyboard is used
  let event = new Event('click', { bubbles: true });

  // utility buttons
  if (e.ctrlKey && e.key.toLowerCase() === 'c')
    clickButton(utilityBtns, 0, event);
  if (e.ctrlKey && e.key.toLowerCase() === 'z')
    clickButton(utilityBtns, 1, event);
  if (e.ctrlKey && e.key.toLowerCase() === 'm')
    clickButton(utilityBtns, 2, event);
  if (e.key === 'Backspace') clickButton(utilityBtns, 3, event);

  // Operator buttons
  if (e.key === '/') clickButton(operatorButtons, 0, event);
  if (e.shiftKey && e.key.toLowerCase() === 'b')
    clickButton(operatorButtons, 1, event);
  if (e.key === '-') clickButton(operatorButtons, 2, event);
  if (e.shiftKey && e.key.toLowerCase() === 'q')
    clickButton(operatorButtons, 3, event);

  // Enter button
  if (e.key === 'Enter') assignBtn.dispatchEvent(event);

  // Number buttons
  if (e.key === '1') clickButton(numButtons, 6, event);
  if (e.key === '2') clickButton(numButtons, 7, event);
  if (e.key === '3') clickButton(numButtons, 8, event);
  if (e.key === '0') clickButton(numButtons, 9, event);
  if (e.key === '7') clickButton(numButtons, 0, event);
  if (e.key === '8') clickButton(numButtons, 1, event);
  if (e.key === '9') clickButton(numButtons, 2, event);
  if (e.key === '4') clickButton(numButtons, 3, event);
  if (e.key === '5') clickButton(numButtons, 4, event);
  if (e.key === '6') clickButton(numButtons, 5, event);

  // Dot button
  if (e.key === '.') dotBtn.dispatchEvent(event);
});

// === Helper function === //

function updateOperDisplay() {
  oprIndicatorDisplay.textContent = operator;
}

function operate(a, opr, b) {
  if (opr === '/' && b === 0) {
    // Cause Math.round() return NaN
    return 'error';
  }
  switch (opr) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
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
  display.value = '';
}

function clearData() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  oprIndicatorDisplay.textContent = '';
}

function clickButton(array, buttonArrayIndex, customEvent) {
  array[buttonArrayIndex].dispatchEvent(customEvent);
}

function toggleClickedEqualBtn(){
  clickedEqualBtn = !clickedEqualBtn;
}

// see what is happening in the console
// const btnsContainer = document.querySelector('.btns-cont');

// btnsContainer.addEventListener('click', (e) => {
//   console.log('first: ' + firstOperand);
//   console.log('second: ' + secondOperand);
//   console.log('operator: ' + operator);
// });
