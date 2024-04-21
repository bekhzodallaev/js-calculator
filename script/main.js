const displayPreviousValue = document.getElementById('previous-value');
const displayCurrentValue = document.getElementById('current-value');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const display = {
    currentValue: '',
    previousValue: '',
    operationType: undefined,
    operators: {
        add: '+',
        divide: '/',
        multiply: 'x',
        subtract: '-',
    },
    calculator: {
        add: (num1, num2) => num1 + num2,
        subtract: (num1, num2) => num1 - num2,
        divide: (num1, num2) => num1 / num2,
        multiply: (num1, num2) => num1 * num2,
    },
    clear() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.printValues();
    },
    clearAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.operationType = undefined;
        this.printValues();
    },
    compute(operator) {
        this.operationType !== 'equals' && this.calculate();
        this.operationType = operator;
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.printValues();
    },
    addNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.printValues();
    },
    printValues() {
        displayCurrentValue.textContent = this.currentValue;
        displayPreviousValue.textContent = `${this.previousValue} ${this.operators[this.operationType] || ''}`;
    },
    calculate() {
        const previousValue = parseFloat(this.previousValue);
        const currentValue = parseFloat(this.currentValue);

        if (isNaN(currentValue) || isNaN(previousValue)) return;
        this.currentValue = this.calculator[this.operationType](previousValue, currentValue);
    },
};

numberButtons.forEach((button) => {
    button.addEventListener('click', () => display.addNumber(button.innerHTML));
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => display.compute(button.value));
});