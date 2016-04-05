var calculatorapp = (function(app) {

	var StringCalculator = function(bracketParser, operatorHandler) {

		this.bracketParser = bracketParser;
		this.operatorHandler = operatorHandler;

	};

	StringCalculator.prototype.calculateBulkString = function(bulkStr) {

		var bracketPattern, unbracketedStr, calculatedStr, regPattern, manipulatedBulkString;

		bracketPattern = /[\(]/;
		var failSafeStop = 50;

		bulkStr = this.bracketParser.insertBracketMultiply(bulkStr);
		// bulkStr = ;

		while (bracketPattern.test(bulkStr) && failSafeStop > 0) {

			unbracketedStr = this.bracketParser.getFirstBracketContents(bulkStr);
			calculatedStr = this.calculateUnbracketedString(unbracketedStr);

			bulkStr = this.bracketParser.replaceFirstBracket(bulkStr, calculatedStr);

			if (failSafeStop === 0) {
				return "More than 50 brackets. Stopping";
			}
			failSafeStop--;
		}

		return this.calculateUnbracketedString(bulkStr);

	};

	StringCalculator.prototype.calculateUnbracketedString = function(unbracketedStr) {

		//Return numbers only unaltered
		if (!isNaN(unbracketedStr)) {
			return unbracketedStr;
		}

		var numbers, rawOperators, operators, result;

		numbers = this.extractNumbers(unbracketedStr);
		rawOperators = this.operatorHandler.extractOperators(unbracketedStr);
		operators = this.operatorHandler.interpretRawOperators(rawOperators);
		operators.sort(this.operatorHandler.compareOperators);
		result = this.processCalculation(numbers, operators);

		return result;

	};

	StringCalculator.prototype.extractNumbers = function(str) {
		return str.match(/[\-\+]?[\d]+([\.][\d]+)?|[\-\+]?[\.][\d]+/g);
	};

	StringCalculator.prototype.processCalculation = function(numbers, operators) {

		var lengthOperators, i, num1, num2, index1, index2, result;

		lengthOperators = operators.length;
		i = 0;

		for (; i < lengthOperators; i++) {

			index1 = this.getLowerExistingIndex(operators[i].index1, numbers);
			index2 = this.getUpperExistingIndex(operators[i].index2, numbers);

			num1 = parseFloat(numbers[index1]);
			num2 = parseFloat(numbers[index2]);

			result = operators[i].operation(num1, num2);

			numbers[index1] = result;
			numbers[index2] = "";
		}

		return result;

	};

	StringCalculator.prototype.getLowerExistingIndex = function(curIndex, numbers) {

		var val;

		for (; curIndex >= 0; curIndex--) {
			val = numbers[curIndex];
			if (val!=="") {
				return curIndex;
			}
		}

	};

	StringCalculator.prototype.getUpperExistingIndex = function(curIndex, numbers) {

		var val, len;

		len = numbers.length;
		for (; curIndex < len; curIndex++) {
			val = numbers[curIndex];
			if (val!=="") {
				return curIndex;
			}
		}

	};

	app.StringCalculator = StringCalculator;

	return app;

}(calculatorapp || {}));