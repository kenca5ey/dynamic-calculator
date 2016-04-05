var calculatorapp = (function(app) {

	var OperatorHandler = function() {

		this.prioritySubtract = 4;
		this.priorityAdd = 5;
		this.priorityPower = 1;
		this.priorityMultiply = 3;
		this.priorityDivide = 2;

		this.subtract = function(a, b) {
			return a - b;
		};

		this.add = function(a, b) {
			return a + b;
		};

		this.power = function(a, b) {
			return Math.pow(a, b);
		};

		this.multiply = function(a, b) {
			return a * b;
		};

		this.divide = function(a, b) {
			return a / b;
		};

	};

	OperatorHandler.prototype.extractOperators = function(str) {
		return str.match(/(?!^[\-\+])[\-\+\*\/\^]+/g);
	};

	OperatorHandler.prototype.interpretRawOperators = function(rawOperators) {

		var operators, i, len, rawOperator, operator;

		operators = [];
		i = 0;
		len = rawOperators.length;

		for (; i < len; i++) {
			rawOperator = rawOperators[i];
			operator = this.interpretRawOperator(rawOperator, i);
			operators.push(operator);
		}

		return operators;
	};

	OperatorHandler.prototype.interpretRawOperator = function(rawOperator, index) {

		var operator;

		switch (rawOperator) {
			case "--":
			case "-+":
				operator = this.buildOperator(this.prioritySubtract, index, this.subtract);
				break;
			case "-":
			case "+":
			case "+-":
			case "++":
				operator = this.buildOperator(this.priorityAdd, index, this.add);
				break;
			case "*":
			case "*-":
			case "*+":
				operator = this.buildOperator(this.priorityMultiply, index, this.multiply);
				break;
			case "/":
			case "/-":
			case "/+":
				operator = this.buildOperator(this.priorityDivide, index, this.divide);
				break;
			case "^":
			case "^-":
			case "^+":
				operator = this.buildOperator(this.priorityPower, index, this.power);
				break;
			default:
				console.log("Unknown Operator");
		}

		return operator;
	};

	OperatorHandler.prototype.buildOperator = function(priority, index, operation) {

		return {
			"priority": priority,
			"index1": index,
			"index2": index + 1,
			"operation": operation,
		};

	};

	OperatorHandler.prototype.compareOperators = function(a, b) {

		if (a.priority < b.priority)
			return -1;
		else if (a.priority > b.priority)
			return 1;
		else
			return 0;

	};

	app.OperatorHandler = OperatorHandler;

	return app;

}(calculatorapp || {}));