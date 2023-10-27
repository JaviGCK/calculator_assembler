//Variables. 

const display = document.querySelector(".display");
const history = document.querySelector(".lastOps");
const operatorBtns = document.querySelectorAll("#operatorBtn");
const numberBtns = document.querySelectorAll("#numberBtn");
const negativeButton = document.querySelector("#negativeBtn");
const eraseButton = document.querySelector("#eraseBtn");
const decimalButton = document.querySelector("#decimalBtn");
const equalButton = document.querySelector("#equalBtn");

const bodyStyleDarkMode = document.querySelector(".bodyStyle");
const switchDarkMode = document.querySelector(".spanStyle");
const lastOpsDarkMode = document.querySelector(".lastOps");
const displayDarkMode = document.querySelector(".display");
const calculatorDarkMode = document.querySelector(".calculator");
const buttonDarkMode = [...document.querySelectorAll(".buttonStyle")];

const audio = document.querySelector("#myAudio");
const buttonMusic = document.querySelector("#myButton");

//addEventListener that work with various buttons.

operatorBtns.forEach(function (button) {
    button.addEventListener("click", function () {
        printOperator(button.textContent);
    });
});

numberBtns.forEach(function (button) {
    button.addEventListener("click", function () {
        printNumber(button.textContent);
    });
});


//addEventListener for simple button.

eraseButton.addEventListener("click", eraseNumber);
negativeButton.addEventListener("click", negativeNumber);
decimalButton.addEventListener("click", printDecimal);
equalButton.addEventListener("click", equal);
switchBtn.addEventListener("click", toggleSwitch);


//Function that allows the calculator to operate.

function logicOperation(arrOps, arrNums) {

    if (arrOps[0] == '-' && arrOps[1]) {
        arrOps.splice(0, 1);
        arrNums[0] = arrNums[0] * -1;
    }

    if (arrOps[0] == '.') {
        arrOps.splice(0, 1);
        arrNums[0] = arrNums[0];
    }

    let result = 0;
    let num1 = arrNums[0];
    let num2 = arrNums[1];

    switch (arrOps[0] || arrOps[1] || arrOps[2] || arrOps[3]) {
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        default:
            result = "Not today";
    }
    return result;
}

//Function that establishes how the buttons should work.

function eraseNumber() {
    history.textContent = '';
    display.textContent = '';
}

function negativeNumber() {
    if (Math.sign(display.textContent)) {
        display.textContent = -(display.textContent);
    }
}

function printOperator(operator) {
    if (!testOperator() && display.textContent.length !== 0 && !testOperator1()) {
        if (display.textContent.length < 15 && display.textContent) {
            display.textContent += operator;
        }
    }
}

function printNumber(number) {
    if (display.textContent.length < 15) {
        display.textContent += number;
    }
}

function printDecimal() {
    if (!testOperator()) {
        if (display.textContent.length < 15 && display.textContent.length !== 0 && !display.textContent.includes('.', 2)) {
            display.textContent += ".";
        }
    }
}

function equal() {
    if (!testOperator()) {
        const arrNumbers = display.textContent.split(/[-+*/%]/).map(Number);
        const arrOperators = display.textContent.split(/\d/);
        for (let i = 0; i < arrOperators.length; i++) {
            if (arrOperators[i] == "") arrOperators.splice(i, 1);
        }
        history.textContent = display.textContent;
        for (let i = 0; i < arrNumbers.length; i++) {
            if (arrNumbers[i] == "") arrNumbers.splice(i, 1);
        }
        let result = logicOperation(arrOperators, arrNumbers);
        display.textContent = result;
    }
}


//Special function for operators.

function testOperator() {
    if (display.textContent.endsWith('%')) return true;
    else if (display.textContent.endsWith('/')) return true;
    else if (display.textContent.endsWith('*')) return true;
    else if (display.textContent.endsWith('-')) return true;
    else if (display.textContent.endsWith('+')) return true;
    else if (display.textContent.endsWith('.')) return true;
    else return false;
}

function testOperator1() {
    if (display.textContent.includes('%')) return true;
    else if (display.textContent.includes('/')) return true;
    else if (display.textContent.includes('*')) return true;
    else if (display.textContent.includes('-', 2)) return true;
    else if (display.textContent.includes('+')) return true;
    else return false;
}


//Dark's mode function.

function toggleSwitch() {
    bodyStyleDarkMode.classList.toggle("bodyStyleDark");
    lastOpsDarkMode.classList.toggle("lastOpsDark")
    displayDarkMode.classList.toggle("displayDark");
    calculatorDarkMode.classList.toggle("calculatorDark");
    switchDarkMode.classList.toggle("switchBtnDark");
    buttonDarkMode.forEach(function (button) {
        button.classList.toggle("buttonStyleDark");
    });
}


// function for audio.

let playMusic = false;
buttonMusic.addEventListener("click", function () {
    if (playMusic) {
        audio.pause();
        playMusic = false;
    } else {
        audio.play();
        playMusic = true;
    }
});

