// Declaration
let mainOp = []; //store input from button

// Get elements from buttons
let calcDisplay = document.querySelector('.calculationDisplay');
let operationDisplay = document.querySelector('.operationDisplay');
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn7 = document.getElementById("btn7");
let btn8 = document.getElementById("btn8");
let btn9 = document.getElementById("btn9");
let btn0 = document.getElementById("btn0");
let btnPoint = document.getElementById("btnPoint");
let btnAdd = document.getElementById("btnAdd");
let btnSubstract = document.getElementById("btnSubstract");
let btnMultiply = document.getElementById("btnMultiply");
let btnDivide = document.getElementById("btnDivide");
let btnAC = document.getElementById("btnAC");
let btnCE = document.getElementById("btnCE");
let btnEqual = document.getElementById("btnEqual");

// Button click actions
btn1.addEventListener("click", function(e){printButton(1), displayOperation()});
btn2.addEventListener("click", function(e){printButton(2), displayOperation()});
btn3.addEventListener("click", function(e){printButton(3), displayOperation()});
btn4.addEventListener("click", function(e){printButton(4), displayOperation()});
btn5.addEventListener("click", function(e){printButton(5), displayOperation()});
btn6.addEventListener("click", function(e){printButton(6), displayOperation()});
btn7.addEventListener("click", function(e){printButton(7), displayOperation()});
btn8.addEventListener("click", function(e){printButton(8), displayOperation()});
btn9.addEventListener("click", function(e){printButton(9), displayOperation()});
btn0.addEventListener("click", function(e){printButton(0), displayOperation()});
btnPoint.addEventListener("click", function(e){printButton("\."), displayOperation()});
btnAdd.addEventListener("click", function(e){printButton("\ \+\ "), displayOperation()});
btnSubstract.addEventListener("click", function(e){printButton("\ \-\ "), displayOperation()});
btnMultiply.addEventListener("click", function(e){printButton("\ \*\ "), displayOperation()});
btnDivide.addEventListener("click", function(e){printButton("\ \/\ "), displayOperation()});
btnAC.addEventListener("click", function(e){clearOperation(), displayOperation()});
btnCE.addEventListener("click", function(e){clearLastEntry(), displayOperation()});
btnEqual.addEventListener("click", function(e){printButton("\ \=\ "), calculateOperation(), displayOperation()});

// Display operation
function displayOperation() {
    calcDisplay.innerHTML = '';

    for (let i = 0; i < mainOp.length; i++) {
        calcDisplay.innerHTML += mainOp[i];
    }
}

// Display functions
function printButton (val) {
    mainOp.push(val);
    return mainOp;
}

function clearOperation() {
    operationDisplay.innerHTML = '';
    mainOp.length = 0;
    return mainOp;
}

function clearLastEntry() {
    mainOp.pop();
    return mainOp;
}

// Calculate
function calculateOperation() {

    // Declaration
    let calculationResult = 0; //store calculation result
    let pointIndex = 0; //store index for point value
    let skip = 0; //jump ## of steps in calculation
    let tempOp = []; //store proxy value from mainOp array before final calculation
    tempOp.length = 0; //Initialize tempOp array

    // Step-1: merge numbers
    mainOp.forEach((v, i) => {
        // Number value
        if (typeof v === 'number') {
            if (pointIndex != i) {
                calculationResult = calculationResult + Math.pow(10,pointIndex - i)*v;
            }

            if (pointIndex == i) {
                calculationResult = calculationResult*10 + v;
                pointIndex++;
            }
        }

        else if ((typeof v !== 'number') && (v === "\.")) {    
        }

        else {
            tempOp.push(calculationResult);
            tempOp.push(v);
            calculationResult = 0;
            pointIndex = i+1;
            return tempOp;
        }
    });

    // Reset parameter
    mainOp.length = 0;
    tempOp.forEach((v) => {
        mainOp.push(v);
    });
    tempOp.length = 0;

    // Update operation display
    operationDisplay.innerHTML = '';

    for (let i = 0; i < mainOp.length; i++) {
        operationDisplay.innerHTML += mainOp[i];
    }

    // Step-2: First operations
    mainOp.forEach((v,i) => {
        // Multiplication
        if ((typeof v !== 'number') && (v === "\ \*\ ") && (skip == 0)) {
            console.log(i, "**", mainOp[i+1]);
            tempOp[tempOp.length-1] =  tempOp[tempOp.length-1] * mainOp[i+1];
            skip = 2;
        }
        // Division
        if ((typeof v !== 'number') && (v === "\ \/\ ") && (skip == 0)) {
            console.log(i, "//", mainOp[i+1]);
            tempOp[tempOp.length-1] =  tempOp[tempOp.length-1] / mainOp[i+1];
            skip = 2;
        }

        // Skip element
        if (skip > 0) {
            skip--;
        }

        else {
            tempOp.push(v);
        }

        return tempOp;
    });
    
    // Reset parameter
    mainOp.length = 0;
    tempOp.forEach((v) => {
        mainOp.push(v);
    });
    tempOp.length = 0;

    // Step-3: Second operations
    mainOp.forEach((v,i) => {
        // Multiplication
        if ((typeof v !== 'number') && (v === "\ \+\ ") && (skip == 0)) {
            console.log(i, "**", mainOp[i+1]);
            tempOp[tempOp.length-1] =  tempOp[tempOp.length-1] + mainOp[i+1];
            skip = 2;
        }
        // Division
        if ((typeof v !== 'number') && (v === "\ \-\ ") && (skip == 0)) {
            console.log(i, "//", mainOp[i+1]);
            tempOp[tempOp.length-1] =  tempOp[tempOp.length-1] - mainOp[i+1];
            skip = 2;
        }

        // Skip element
        if (skip > 0) {
            skip--;
        }

        else {
            tempOp.push(v);
        }

        return tempOp;
    });

    mainOp.length = 0;
    mainOp.push(tempOp[0]);

    return mainOp;
}