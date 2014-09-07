var utilities = {};

(function(){

	utilities.calculate = function(inputValues, operator){
		var output = $("input[name='calculator-output']");	
		var prev = $("input[name='previous-input']");
		var answer;

		//switch for operator choice and compute answer, handles divide by 0 case
		switch(operator){
			case "+":
				answer = (parseFloat(inputValues[0]) + parseFloat(inputValues[1])).toFixed(3);
				output.val(answer);
				return answer;
			case "-":
				answer = (parseFloat(inputValues[0]) - parseFloat(inputValues[1])).toFixed(3);
				output.val(answer);
				return answer;
			case "*":
				answer = (parseFloat(inputValues[0]) * parseFloat(inputValues[1])).toFixed(3);
				output.val(answer);
				return answer;
			case "/":
				if(parseFloat(inputValues[1]) == 0) {
					prev.val("Don't you dare. Rolling back to "+inputValues[0]);
					return inputValues[0];
				}
				else {
					answer = (parseFloat(inputValues[0]) / parseFloat(inputValues[1])).toFixed(3);
					output.val(answer);
				}
				return answer;
			default:
				break;
		}
	};
})();