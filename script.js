/*const display = document.querySelector(".display");
const buttons = document.querySelector("button");
const specialChars = ["%", "x", "/", "+", "="]
let output = "";

const calculate = (btnValue) => {
    if(btnValue === "=" && output !== ""){
        output = eval(output.replace("%", "/100"));
    }else if (btnValue === "AC"){
        output = ""
    }else if(btnValue === "DEL"){
        output = output.toString().slice(0, -1);
    }else{
        if(output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    button.addEventListener("click", e => calculate(e.target.dataset.value))
})  */

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button"); // Changed this line
const specialChars = ["%", "*", "/", "+", "="]
let output = "";

const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        // Check if the input contains a percentage
        if (output.includes("%")) {
            // Split the input into operands and operator
            const [num1, operator, num2] = output.split(/([+\-*/%])/);

            // Convert num2 to its decimal equivalent if it's a percentage
            const num2Value = num2.includes("%") ? parseFloat(num2) / 100 : parseFloat(num2);

            // Perform the calculation based on the operator
            switch (operator) {
                case "+":
                    output = parseFloat(num1) + num2Value;
                    break;
                case "-":
                    output = parseFloat(num1) - num2Value;
                    break;
                case "*":
                    output = parseFloat(num1) * num2Value;
                    break;
                case "/":
                    output = parseFloat(num1) / num2Value;
                    break;
                default:
                    output = "";
                    break;
            }
        } else {
            // If no percentage symbol is found, evaluate the expression as usual
            output = eval(output);
        }
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else {
        if (output === "0" && btnValue === "0") {
            // If the current output is "0" and the user clicks "0" again, do nothing
            return;
        }
        if (output === "" && specialChars.includes(btnValue)) return;
        if (btnValue === "00") {
            if (output === "" || output === "0") {
                // If the user clicks "00" at first or after "0", show only one "0"
                output = "0";
            } else {
                // If the user clicks "00" after other numbers, append "00" to the output
                output += btnValue;
            }
        } else {
            output += btnValue;
        }
    }
    
    display.value = output;
};


//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    button.addEventListener("click", e => calculate(e.target.dataset.value))
})

