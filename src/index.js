const ADDITION_ID = 'js-addition';
const BACK_ID = 'js-back';
const CANCEL_ID = 'js-cancel';
const CLEAR_ID = 'js-clear';
const COMMA_ID = 'js-comma';
const DISPLAY_ID = 'js-display';
const DIVIDE_ID = 'js-divide';
const EQUAL_ID = 'js-equal';
const FRACTION_ID = 'js-fraction';
const INVERT_ID = 'js-invert';
const MEMORY_ADD_ID = 'js-M+';
const MEMORY_CLEAR_ID = 'js-MC';
const MEMORY_MINUS_ID = 'js-M-';
const MEMORY_READ_ID = 'js-MR';
const MEMORY_SET_ID = 'js-MS';
const MULTIPLY_ID = 'js-multiply';
const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const NUMBER_OF_NUMBERS_IN_KEYBOARD = 10;
const PERCENT_ID = 'js-percent';
const POWER_ID = 'js-power';
const SUBTRACTION_ID = 'js-subtraction';
const SQUARE_ID = 'js-square';

class Calculator {
  constructor() {
    this.memoryValue = 0;
    this.displayValue = '0';
    this.previousValue = null;
    this.selectedFunction = null;
    this.isFunctionDone = false;
    this.repeatedValue = 0;
    this.wasEqualClicked = false;
    this.wasSpecialFunctionClicked = false;

    this.bindToDisplay();
    this.bindToNumbers();
    this.bindToButtons();
  }

  bindToDisplay() {
    const display = document.getElementById(DISPLAY_ID);

    if (!display) {
      throw 'Nie znaleziono elementu dla wyświetlacza';
    }

    display.textContent = this.displayValue;
    this.display = display;
  }

  bindToNumbers() {
    const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

    if (numbers.length !== NUMBER_OF_NUMBERS_IN_KEYBOARD) {
      console.warn('W klawiaturze brakuje cyfr');
    }

    numbers.forEach((number) =>
      number.addEventListener('click', (event) => this.concatenateNumber(event))
    );
  }

  bindToButtons() {
    this.bindFunctionToButton(MEMORY_CLEAR_ID, () => this.memoryClear());
    this.bindFunctionToButton(MEMORY_READ_ID, () => this.memoryRead());
    this.bindFunctionToButton(MEMORY_ADD_ID, () => this.memoryAdd());
    this.bindFunctionToButton(MEMORY_MINUS_ID, () => this.memoryMinus());
    this.bindFunctionToButton(MEMORY_SET_ID, () => this.memorySet());

    return;
  }

  bindFunctionToButton(id, callback) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Nie znaleziono elementu o id ${id}`);
      return;
    }

    element.addEventListener('click', callback);
    return;
  }

  concatenateNumber(event) {
    const textContentWithoutWhiteSigns = event.target.textContent.replace(
      /\s/g,
      ''
    );

    this.displayValue =
      this.displayValue === null ||
      this.displayValue === '0' ||
      this.wasSpecialFunctionClicked
        ? textContentWithoutWhiteSigns
        : this.displayValue + textContentWithoutWhiteSigns;

    if (this.wasEqualClicked) {
      this.previousValue = 0;
      this.repeatedValue = 0;
      this.wasEqualClicked = false;
    }

    this.wasSpecialFunctionClicked = false;
    this.isFunctionDone = false;
    this.display.textContent = this.displayValue;
  }

  memoryClear() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = 0;
  }

  memoryRead() {
    this.wasSpecialFunctionClicked = true;
    this.displayValue = this.memoryValue;
    this.display.textContent = this.memoryValue.toString();
  }

  memoryAdd() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = this.memoryValue + Number(this.displayValue);
  }

  memoryMinus() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = this.memoryValue - Number(this.displayValue);
  }

  memorySet() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = Number(this.displayValue);
  }
}

new Calculator();
