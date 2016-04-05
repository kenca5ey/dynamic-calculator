var calculatorapp = (function(app) {

	var ValidityChecker = function() {

		this.invalidCharactersPattern = /[^\-\+\*\/\d\.\^\(\)]/g;
		this.invalidOperatorCombinationPattern = /[\-\+\*\/\.\^][\)\^\*\/]|[\-\+]{3,}|[\.][^\d]|[\-\+\*\/\.\^][\-\+]{2,}/g;
		this.endOfStringOperatorPattern = /[\-\+\*\/\.\^\(]$/g;
		this.bracketPresentPattern = /[\(\)]/g;
	};

	ValidityChecker.prototype.invalidEntryCheck = function(inputStr) {

		var invalidCharacters, invalidOperatorCombination, endOfStringOperator, bracketsUnmatched;

		invalidCharacters = inputStr.match(this.invalidCharactersPattern);
		invalidOperatorCombination = inputStr.match(this.invalidOperatorCombinationPattern);
		endOfStringOperator = inputStr.match(this.endOfStringOperatorPattern);
		bracketsUnmatched = this.determineBracketState(inputStr);

		if(bracketsUnmatched){
			return bracketsUnmatched;
		} else if (invalidCharacters) {
			return "Invalid Entry: " + invalidCharacters;
		} else if (invalidOperatorCombination) {
			return "Invalid Operator Combination: " + invalidOperatorCombination;
		} else if (endOfStringOperator) {
			return endOfStringOperator + " at end of string.";
		} else {
			return false;
		}

	};

	ValidityChecker.prototype.determineBracketState = function(inputStr) {

		var depth, brackets;

		brackets = inputStr.match(this.bracketPresentPattern);
		if(!brackets) return false;
		depth = 0;
		for (var i = 0; i < brackets.length; i++) {
			if (brackets[i] === "(") depth += 1;
			if (brackets[i] === ")") depth -= 1;
			if (depth < 0) return "Unmatched Closing Bracket";
		}
		if (depth !== 0) {
			return "Unmatched Opening Bracket";
		}

	};

	app.ValidityChecker = ValidityChecker;

	return app;

}(calculatorapp || {}));