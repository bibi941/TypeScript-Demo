{
  var Calculator = /** @class */ (function () {
    function Calculator() {
      this.n1 = null
      this.n2 = null
      this.operator = null
      this.result = null
      this.keys = [
        ['clear','÷'],
        ['7','8','9','x'],
        ['4','5','6','-'],
        ['1','2','3','+'],
        ['0','.','=']
      ]
      this.creatSpan()
      this.creatOutPut()
      this.creatContainner()
      this.creatButtons()
      this.bindEvents()
    }

    Calculator.prototype.creatButton = function (text,content,className) {
      var button = document.createElement('button')
      button.textContent = text
      if (className) {
        button.className = className
      }
      content.appendChild(button)
      return button
    }
    Calculator.prototype.creatButtons = function () {
      var _this = this
      this.keys.forEach(function (textList) {
        var div = document.createElement('div')
        div.classList.add('row')
        textList.forEach(function (text) {
          _this.creatButton(text,div,'button text-' + text)
        })
        _this.containner.appendChild(div)
      })
    }
    Calculator.prototype.creatContainner = function () {
      var containner = document.createElement('div')
      containner.classList.add('caculator')
      containner.appendChild(this.outPut)
      document.body.appendChild(containner)
      this.containner = containner
    }
    Calculator.prototype.creatSpan = function () {
      var span = document.createElement('span')
      span.textContent = '0'
      this.span = span
    }
    Calculator.prototype.creatOutPut = function () {
      var outPut = document.createElement('div')
      outPut.classList.add('outPut')
      outPut.appendChild(this.span)
      this.outPut = outPut
    }
    Calculator.prototype.bindEvents = function () {
      var _this = this
      this.containner.addEventListener('click',function (e) {
        if (e.target instanceof HTMLButtonElement) {
          var button = e.target
          var text = button.textContent
          _this.updateNumberOrOperator(text)
        }
      })
    }
    Calculator.prototype.updateN1OrN2 = function (n,text) {
      if (this[n]) {
        this[n] = this[n] + text
      } else {
        this[n] = text
      }
      this.span.textContent = this[n].toString()
    }
    Calculator.prototype.updateNumber = function (text) {
      if (this.operator) {
        this.updateN1OrN2('n2',text)
      } else {
        this.updateN1OrN2('n1',text)
      }
    }
    Calculator.prototype.updateResult = function () {
      var n1 = parseFloat(this.n1)
      var n2 = parseFloat(this.n2)
      var result
      if (this.operator === '+') {
        result = n1 + n2
      } else if (this.operator === '-') {
        result = n1 - n2
      } else if (this.operator === 'x') {
        result = n1 * n2
      } else if (this.operator === '÷') {
        result = n1 / n2
      }
      result = parseFloat(result.toPrecision(12))
      if (n2 === 0) {
        result = '不是数字'
      }
      this.span.textContent = result.toString()
      this.n1 = null
      this.n2 = null
      this.operator = null
      this.result = result
    }
    Calculator.prototype.updateOperator = function (text) {
      if (this.n1 === null) {
        this.n1 = this.result
      }
      this.operator = text
    }
    Calculator.prototype.updateNumberOrOperator = function (text) {
      if ('0123455679.'.indexOf(text) >= 0) {
        this.updateNumber(text)
      } else if ('+-x÷'.indexOf(text) >= 0) {
        this.updateOperator(text)
      } else if ('='.indexOf(text) >= 0) {
        this.updateResult()
      } else if (text === 'clear') {
        this.n1 = null
        this.n2 = null
        this.operator = null
        this.result = null
        this.span.textContent = '0'
      }
    }
    return Calculator
  }())
  new Calculator()
}
