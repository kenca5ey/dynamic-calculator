(function() {

	var bracketParser, validityChecker, operatorHandler, stringCalculator, inputString, input, output;

	inputString = "-22(4+2)+2.4+(3^0.22(1*2*5)(4)+1)8/2^2+2/-2-18+-25";

	bracketParser = new calculatorapp.BracketParser();
	validityChecker = new calculatorapp.ValidityChecker();
	operatorHandler = new calculatorapp.OperatorHandler();
	stringCalculator = new calculatorapp.StringCalculator(bracketParser, operatorHandler);

	input = document.getElementById("input");

	output = document.getElementById("output");

	function run() {
		var inputStr, invalidEntry;
		inputStr = input.innerHTML;
		invalidEntry = validityChecker.invalidEntryCheck(inputStr);
		
		if (invalidEntry) {
			output.innerHTML = invalidEntry;
		} else {
			output.innerHTML = stringCalculator.calculateBulkString(inputStr);
		}
	}

	input.addEventListener("DOMSubtreeModified", run);

	input.innerHTML = inputString;

}());