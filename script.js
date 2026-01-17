let res = false;
let waitforopt2 = false;
let firstOp = null;
let operator = null;

const screenval = document.querySelector(".label");

const decimal = document.querySelector("#decimal");
    
        decimal.addEventListener("click", () => {

            // If previous result is displayed, replace it
            if (res) {
                screenval.textContent = "0.";
                res = false;
                return;
            }

            // If we just pressed an operator, start fresh
            if (waitforopt2) {
                screenval.textContent = "0.";
                waitforopt2 = false;
                return;
            }

            // If screen is empty, pretend 0
            if(screenval.textContent === "") {
                screenval.textContent = "0.";
            }

            // Prevents multiplte decimals
            if (screenval.textContent.includes(".")) {
                return;
            }

            // Append number normally
            screenval.textContent += ".";

        });

    
        document.querySelector("#posneg").addEventListener("click", () => {

            if (screenval.textContent === "" || screenval.textContent === "Error") {
                return
            }

            let current = screenval.textContent;

            if (current.startsWith("-")) {
                screenval.textContent = current.slice(1);
            } else {
                screenval.textContent = "-" + current
            }


        });

function pressnum(id1, val) {
    const button = document.querySelector(id1);
  
        button.addEventListener("click", () => {

            // If previous result is displayed, replace it
            if (res) {
                screenval.textContent = val;
                res = false;
                return;
            }

            // If we just pressed an operator, start fresh
            if (waitforopt2) {
                screenval.textContent = val;
                waitforopt2 = false;
                return;
            }

            // Append number normally
            screenval.textContent += val;

        });

    }


// Operator buttons
document.querySelectorAll("#opt").forEach(button => {
    button.addEventListener("click", () => {
        firstOp = Number(screenval.textContent);
        operator = button.textContent;
        waitforopt2 = true;
    });
});

// Number buttons
pressnum("#one", 1);
pressnum("#two", 2);
pressnum("#three", 3);
pressnum("#four", 4);
pressnum("#five", 5);
pressnum("#six", 6);
pressnum("#seven", 7);
pressnum("#eight", 8);
pressnum("#nine", 9);
pressnum("#zero", 0);

// Handles infinite decimal results eg 1.333333...etc
function formalres(value) {
    if (typeof value !== "number")
        return value;
    return Number.isInteger(value) ? value : parseFloat(value.toFixed(6))
}

// Equals
document.querySelector("#equal").addEventListener("click", () => {
    const secopt = Number(screenval.textContent);
    let result;

    switch (operator) {
        case "+": result = firstOp + secopt; break;
        case "-": result = firstOp - secopt; break;
        case "x": result = firstOp * secopt; break;
        case "/": result = secopt !== 0 ? firstOp / secopt : "Error"; break;
        default: return;
    }

    screenval.textContent = formalres(result);
    res = true;
    firstOp = null;
    waitforopt2 = false;
});

// AC button
document.querySelector("#ac").addEventListener("click", () => {
    screenval.textContent = "";
    firstOp = null;
    waitforopt2 = false;
    res = false;
});


// DEL
document.querySelector("#del").addEventListener("click", () => {
    if(!res && screenval.textContent.length > 0) {
        screenval.textContent = screenval.textContent.slice(0, -1);
    }
});