var calculatorapp = (function(app) {

	var BracketParser = function() {

		this.patternFirstBracket = /[\(][\d\.\+\-\*\/\^]+[\)]/;
		this.patternMultiplyCandidate = /[\d][\(]|[\)][\d]|[\)][\(]/;

	};

	BracketParser.prototype.getFirstBracketContents = function(bulkStr) {

		var firstBracketMatch, bracketContents, len;

		firstBracketMatch = bulkStr.match(this.patternFirstBracket);
		len = firstBracketMatch[0].length;
		bracketContents = firstBracketMatch[0].slice(1, len - 1);
		return bracketContents;

	};

	BracketParser.prototype.replaceFirstBracket = function(bulkStr, replace) {

		return bulkStr.replace(this.patternFirstBracket, replace);

	};

	BracketParser.prototype.insertBracketMultiply = function(bulkStr) {

		var multiplyCandidate;

		while (this.patternMultiplyCandidate.test(bulkStr)) {
			multiplyCandidate = bulkStr.match(this.patternMultiplyCandidate);
			bulkStr = bulkStr.slice(0, multiplyCandidate.index+1) + "*" + bulkStr.slice(multiplyCandidate.index+1);
		}

		return bulkStr;

	};

	app.BracketParser = BracketParser;

	return app;

}(calculatorapp || {}));