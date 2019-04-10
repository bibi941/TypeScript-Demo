{
  class Calculator {
    public containner: HTMLDivElement
    private span: HTMLSpanElement
    private outPut: HTMLDivElement
    public n1: number
    public n2: number
    public operator: string
    public result: number
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
          if ("0123455679".indexOf(text) >= 0) {
            if (this.operator) {
              if (this.n2) {
                this.n2 = parseInt(this.n2.toString() + text)
              } else {
                this.n2 = parseInt(text)
              }
              this.span.textContent = this.n2.toString()
            } else {
              if (this.n1) {
                this.n1 = parseInt(this.n1.toString() + text)
              } else {
                this.n1 = parseInt(text)
              }
              this.span.textContent = this.n1.toString()
            }
          } else if ("+-x÷".indexOf(text) >= 0) {
            this.operator = text
          } else if ("=".indexOf(text) >= 0) {
            if (this.operator === "+") {
              this.result = this.n1 + this.n2
            } else if (this.operator === "-") {
              this.result = this.n1 - this.n2
            } else if (this.operator === "x") {
              this.result = this.n1 * this.n2
            } else if (this.operator === "÷") {
              this.result = this.n1 / this.n2
            }
            this.span.textContent = this.result.toString()
          }
          console.log(this.n1, this.operator, this.n2)
        }
      })
    }
  }
  new Calculator()
}
