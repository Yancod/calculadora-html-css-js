const previosOperationText = document.querySelector("#operations-previos");
const currentOperationText = document.querySelector("#operations-current");
const bottons = document.querySelectorAll("#buttons-contener button");

class calculator {
    constructor(previosOperationText, currentOperationText) {
        this.previosOperationText = previosOperationText;
        this.currentOperationText = currentOperationText;
        this.currentText = "";
    }

    //Adiciona digito no visor
    addDigit(digit) {
        //Corrigindo erro de pontos ..
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentText = digit
        this.updateScreen();
    }
    processeOperation(operation) {
        //Mudar operaçao
        if (this.currentOperationText.innerText == "" && operation != "c") {
            if (this.previosOperationText.innerText !== "") {
                //mudar de operação
                this.changeOperation(operation);
            }
        }

        // pegar valores atuauis e anteriores
        let operationValue
        const anterior = +this.previosOperationText.innerText.split(" ")[0];
        const atuais = +this.currentOperationText.innerText;
        switch (operation) {
            case "+":
                operationValue =  atuais + anterior
                this.updateScreen(operationValue, operation, atuais, anterior);
                break;
            case "-":
                operationValue = anterior - atuais
                this.updateScreen(operationValue, operation, atuais, anterior);
                break;
            case "*":
                operationValue = anterior * atuais
                this.updateScreen(operationValue, operation, atuais, anterior);
                break;
            case "/":
                operationValue = anterior / atuais
                this.updateScreen(operationValue, operation, atuais, anterior);
                break;
            case "del":
                this.delBtn();
                break;
            case "ce":
                this.clearScreen();
                break;
            case "c":
                this.clearScreenAll();
                break;
            default:
                return;
        }
    }

    updateScreen(
        operationValue = null,
        operation = null,
        atuais = null,
        anterior = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentText;
        } else {
            // Checando de o valor anterior é 0
            if (anterior === 0) {
                operationValue = atuais;
            }
            this.previosOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }
    changeOperation(operation) {
        const mathOperations = ["+", "-", "*", "/"]
        if (!mathOperations.includes(operation)) { return }
        this.previosOperationText.innerText = this.previosOperationText.innerText.slice(0, -1) + operation;
    }
    delBtn() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    clearScreen() {
        this.currentOperationText.innerText = ""
    }
    clearScreenAll(){
        this.currentOperationText.innerText = ""
        this.previosOperationText.innerText = ""
    }
}

const calc = new calculator(previosOperationText, currentOperationText);

bottons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valorPego = e.target.innerText;
        if (+valorPego >= 0 || valorPego === ".") {
            calc.addDigit(valorPego);
        } else {
            calc.processeOperation(valorPego);
        }
    })
})