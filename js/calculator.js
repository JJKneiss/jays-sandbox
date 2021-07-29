class Calculator {
    constructor(PREVIOUS_OPERAND__ELEM, CURRENT_OPERAND_ELEM) {
        this.PREVIOUS_OPERAND__ELEM = PREVIOUS_OPERAND__ELEM;
        this.CURRENT_OPERAND_ELEM = CURRENT_OPERAND_ELEM;
        this.clear();
    }
    clear() {
        this.CURRENT_OPERAND = '';
        this.PREVIOUS_OPERAND = '';
        this.operation = undefined;
    }
    delete() {
        this.CURRENT_OPERAND = this.CURRENT_OPERAND.toString().slice(0, -1);
    }
    numAppend(number) {
        if (number === '.' && this.CURRENT_OPERAND.includes('.')) return
        this.CURRENT_OPERAND = this.CURRENT_OPERAND.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.CURRENT_OPERAND === '') return
        if (this.PREVIOUS_OPERAND !== '') {
            this.compute();
        }
        this.operation = operation;
        this.PREVIOUS_OPERAND = this.CURRENT_OPERAND;
        this.CURRENT_OPERAND = '';
    }
    compute() {
        let computation;
        const PREV = parseFloat(this.PREVIOUS_OPERAND);
        const CURRENT = parseFloat(this.CURRENT_OPERAND);
        if (isNaN(PREV) || isNaN(CURRENT)) return
        switch (this.operation) {
            case '+':
                computation = PREV + CURRENT;
                break;
            case '-':
                computation = PREV - CURRENT;
                break;
            case '*':
                computation = PREV * CURRENT;
                break;
            case '÷':
                computation = PREV / CURRENT;
                break;
            default:
                return
        }
        this.CURRENT_OPERAND = computation;
        this.operation = undefined;
        this.PREVIOUS_OPERAND = '';
    }
    getDisplayNumber(number) {
        const STRING_NUMBER = number.toString();
        const INT_DIGITS = parseFloat(STRING_NUMBER.split('.')[0])
        const DECIMAL_DIGITS = STRING_NUMBER.split('.')[1];
        let intDisplay;
        if (isNaN(INT_DIGITS)) {
            intDisplay = '';
        }
        else {
            intDisplay = INT_DIGITS.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (DECIMAL_DIGITS != null) {
            return `${intDisplay}.${DECIMAL_DIGITS}`
        }
        else {
            return intDisplay;
        }
    }

    updateDisplay() {
        console.log(this.operation);
        this.CURRENT_OPERAND_ELEM.innerText = this.getDisplayNumber(this.CURRENT_OPERAND);
        if (this.operation != null) {
            this.PREVIOUS_OPERAND__ELEM.innerText = `${this.PREVIOUS_OPERAND} ${this.operation}`;
        }
        else {
            this.PREVIOUS_OPERAND__ELEM.innerText = '';
        }
    }
}
const NUMBER_BUTTONS = document.querySelectorAll('[data-number]');
const OPERATION_BUTTONS = document.querySelectorAll('[data-operation]');
const EQUALS_BUTTON = document.querySelector('[data-equals]');
const DELETE_BUTTON = document.querySelector('[data-delete]');
const ALL_CLEAR_BUTTON = document.querySelector('[data-all-clear]')
const PREVIOUS_OPERAND__ELEM = document.querySelector('[data-previous-operand]');
const CURRENT_OPERAND_ELEM = document.querySelector('[data-current-operand]');

const CALCULATOR = new Calculator(PREVIOUS_OPERAND__ELEM, CURRENT_OPERAND_ELEM);
NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        CALCULATOR.numAppend(button.innerText);
        CALCULATOR.updateDisplay();
    })
});
OPERATION_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        CALCULATOR.chooseOperation(button.innerText);
        CALCULATOR.updateDisplay();
    })
})

EQUALS_BUTTON.addEventListener('click', () => {
    CALCULATOR.compute();
    CALCULATOR.updateDisplay();
})
ALL_CLEAR_BUTTON.addEventListener('click', () => {
    CALCULATOR.clear();
    CALCULATOR.updateDisplay();
})
DELETE_BUTTON.addEventListener('click', () => {
    CALCULATOR.delete();
    CALCULATOR.updateDisplay();
})