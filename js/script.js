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
        // pegar valores atuauis e anteriores
        let operationValue
        const anterior = +this.previosOperationText.innerText;
        const atuais = +this.currentOperationText.innerText;
        switch (operation) {
            case "+":
                operationValue = anterior + atuais
                this.updateScreen(operationValue, operation, atuais, anterior);
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
        this.currentOperationText.innerText += this.currentText;
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