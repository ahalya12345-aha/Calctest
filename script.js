const display = document.querySelector('.display');
const keys = document.querySelector('.keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', (e) => {
    const element = e.target;
    if (!element.matches('button')) return;

    const value = element.value;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'C':
            clear();
            break;
        case 'CE':
            clearEntry();
            break;
        case '=':
            handleEqual();
            break;
        default:
            inputNumber(value);
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    } else if (operator === '%') {
        return first % second;
    }
    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function clearEntry() {
    displayValue = '0';
}

function handleEqual() {
    if (operator) {
        const value = parseFloat(displayValue);
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }
}
