{
  class Calculator {
    private span: HTMLSpanElement
    private outPut: HTMLDivElement
    public containner: HTMLDivElement
    public n1: string = null
    public n2: string = null
    public operator: string = null
    public result: string = null
    public keys: Array<Array<string>> = [
      ["clear", "÷"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="]
    ]

    constructor() {
      this.creatSpan()
      this.creatOutPut()
      this.creatContainner()
      this.creatButtons()
      this.bindEvents()
    }

    creatButton(text: string, content: HTMLElement, className: string) {
      let button: HTMLButtonElement = document.createElement("button")
      button.textContent = text
      if (className) {
        button.className = className
      }
      content.appendChild(button)
      return button
    }
    creatButtons() {
      this.keys.forEach((textList: Array<string>) => {
        let div: HTMLDivElement = document.createElement("div")
        div.classList.add("row")
        textList.forEach((text: string) => {
          this.creatButton(text, div, `button text-${text}`)
        })
        this.containner.appendChild(div)
      })
    }
    creatContainner() {
      let containner = document.createElement("div")
      containner.classList.add("caculator")
      containner.appendChild(this.outPut)
      document.body.appendChild(containner)
      this.containner = containner
    }
    creatSpan() {
      let span = document.createElement("span")
      span.textContent = "0"
      this.span = span
    }
    creatOutPut() {
      let outPut = document.createElement("div")
      outPut.classList.add("outPut")
      outPut.appendChild(this.span)
      this.outPut = outPut
    }
    bindEvents() {
      this.containner.addEventListener("click", e => {
        if (e.target instanceof HTMLButtonElement) {
          let button = e.target
          let text = button.textContent
          this.updateNumberOrOperator(text)
        }
      })
    }
    updateN1OrN2(n: string, text: string): void {
      if (this[n]) {
        this[n] = this[n] + text
      } else {
        this[n] = text
      }
      this.span.textContent = this[n].toString()
    }
    updateNumber(text: string) {
      if (this.operator) {
        this.updateN1OrN2("n2", text)
      } else {
        this.updateN1OrN2("n1", text)
      }
    }
    updateResult() {
      let n1: number = parseFloat(this.n1)
      let n2: number = parseFloat(this.n2)
      let result
      if (this.operator === "+") {
        result = n1 + n2
      } else if (this.operator === "-") {
        result = n1 - n2
      } else if (this.operator === "x") {
        result = n1 * n2
      } else if (this.operator === "÷") {
          result = n1 / n2          
      }
      result = parseFloat(result.toPrecision(12))
      if (n2 === 0) { result = '不是数字' }
      this.span.textContent = result.toString()
      this.n1 = null
      this.n2 = null
      this.operator = null
      this.result = result
    }
    updateOperator(text: string) {
      if (this.n1 === null) {
        this.n1 = this.result
      }
      this.operator = text
    }
    updateNumberOrOperator(text: string) {
      if ("0123455679.".indexOf(text) >= 0) {
        this.updateNumber(text)
      } else if ("+-x÷".indexOf(text) >= 0) {
        this.updateOperator(text)
      } else if ("=".indexOf(text) >= 0) {
        this.updateResult()
      } else if (text === "clear") {
        this.n1 = null
        this.n2 = null
        this.operator = null
        this.result = null
        this.span.textContent = "0"
      }
    }
  }
  new Calculator()
}
