{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.keys = [
                ["clear", "÷"],
                ["7", "8", "9", "x"],
                ["4", "5", "6", "-"],
                ["1", "2", "3", "+"],
                ["0", ".", "="]
            ];
            this.creatSpan();
            this.creatOutPut();
            this.creatContainner();
            this.creatButtons();
            this.bindEvents();
        }
        Calculator.prototype.creatButton = function (text, content, className) {
            var button = document.createElement("button");
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            content.appendChild(button);
            return button;
        };
        Calculator.prototype.creatButtons = function () {
            var _this = this;
            this.keys.forEach(function (textList) {
                var div = document.createElement("div");
                div.classList.add("row");
                textList.forEach(function (text) {
                    _this.creatButton(text, div, "button text-" + text);
                });
                _this.containner.appendChild(div);
            });
        };
        Calculator.prototype.creatContainner = function () {
            var containner = document.createElement("div");
            containner.classList.add("caculator");
            containner.appendChild(this.outPut);
            document.body.appendChild(containner);
            this.containner = containner;
        };
        Calculator.prototype.creatSpan = function () {
            var span = document.createElement("span");
            span.textContent = "0";
            this.span = span;
        };
        Calculator.prototype.creatOutPut = function () {
            var outPut = document.createElement("div");
            outPut.classList.add("outPut");
            outPut.appendChild(this.span);
            this.outPut = outPut;
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.containner.addEventListener("click", function (e) {
                if (e.target instanceof HTMLButtonElement) {
                    var button = e.target;
                    var text = button.textContent;
                    if ("0123455679".indexOf(text) >= 0) {
                        if (_this.operator) {
                            if (_this.n2) {
                                _this.n2 = parseInt(_this.n2.toString() + text);
                            }
                            else {
                                _this.n2 = parseInt(text);
                            }
                            _this.span.textContent = _this.n2.toString();
                        }
                        else {
                            if (_this.n1) {
                                _this.n1 = parseInt(_this.n1.toString() + text);
                            }
                            else {
                                _this.n1 = parseInt(text);
                            }
                            _this.span.textContent = _this.n1.toString();
                        }
                    }
                    else if ("+-x÷".indexOf(text) >= 0) {
                        _this.operator = text;
                    }
                    else if ("=".indexOf(text) >= 0) {
                        if (_this.operator === "+") {
                            _this.result = _this.n1 + _this.n2;
                        }
                        else if (_this.operator === "-") {
                            _this.result = _this.n1 - _this.n2;
                        }
                        else if (_this.operator === "x") {
                            _this.result = _this.n1 * _this.n2;
                        }
                        else if (_this.operator === "÷") {
                            _this.result = _this.n1 / _this.n2;
                        }
                        _this.span.textContent = _this.result.toString();
                    }
                    console.log(_this.n1, _this.operator, _this.n2);
                }
            });
        };
        return Calculator;
    }());
    new Calculator();
}
