//declare the Angular Module object
var app = angular.module("CalculatorApp", ['ngRoute']);

(function(){
	//declare a controller by appending the Angular Module object we declared
	//This is the definition for the Calculator controller
	app.controller("calculatorController", function($scope){
		$scope.operator;
		$scope.inputValues = [];
		var isCalculated = false;
		
		//print out the current operation status at the time of calling
		function status(){
			//console.log("[STATUS]\tisCalculated = "+ isCalculated);
			//console.log($scope.inputValues[0] + $scope.operator + $scope.inputValues[1]);
		}

		//start fresh with the calculator
		$scope.clear = function(){
			$scope.inputValues = [];
			$scope.operator = null;
			isCalculated = false;
			var output = $("input[name='calculator-output']");	
			var prev = $("input[name='previous-input']");
			prev.val("");
			output.val("");
		};

		//logic for adding input, kinda buggy still
		$scope.addInput = function(operator){
			var output = $("input[name='calculator-output']");	
			var prev = $("input[name='previous-input']");

			if($scope.inputValues.length==0) {
				$scope.inputValues.push(output.val() || 0);
				$scope.operator = operator;
				prev.val($scope.inputValues[0] + $scope.operator);
				output.val("");
			}
			else if($scope.inputValues.length==1) {
				$scope.inputValues.push(output.val() || 0);
				prev.val($scope.inputValues[0] + $scope.operator + (output.val()) || 0);

				var answer = utilities.calculate($scope.inputValues, $scope.operator);
				status();

				$scope.operator = operator;
				$scope.inputValues = [];
				$scope.inputValues.push(answer);
				isCalculated = true;
			}
		};

		//add a digit to the input field
		$scope.addDigit = function(digit){
			var output = $("input[name='calculator-output']");

			if(isCalculated) {
				output.val("");
				isCalculated = false;
			}
			
			output.val(output.val() + digit);
		};
	});

	//This is the definition for the Game Screen Controller
	app.controller("qaController", function($scope){
		$scope.score = 0;
		$scope.scores = [];
		$scope.showScores = false;
		$scope.question;
		$scope.answer;
		$scope.guess;

		//Make a new game and add the score before clearing
		$scope.newGame = function(){
			$scope.scores.push($scope.score);
			$scope.score = 0;
			$scope.guess = "";
		};

		//Question generation logic
		$scope.generateQuestion = function(){
			var leftNumber = Math.floor((Math.random() * 1000) + 1);
			var rightNumber = Math.floor((Math.random() * 1000) + 1);
			var operator = Math.floor(Math.random() * 3);

			switch(operator){
				case 0:
					operator = '-';
					$scope.answer = leftNumber - rightNumber;
					break;
				case 1:
					operator = '*'
					$scope.answer = leftNumber * rightNumber;
					break;
				case 2:
					operator = '/'
					$scope.answer = leftNumber / rightNumber;
					break;
				default:
					operator = '+';
					$scope.answer = leftNumber + rightNumber;
					break;
			}

			$scope.question = leftNumber + operator + rightNumber + "?";
		};

		//submit your answer. Does not handle floating points very well
		$scope.submit = function(){
			var userGuessed = parseInt($scope.guess);
			userGuessed = !isNaN(userGuessed) && isFinite(userGuessed) ? userGuessed : -1;
			if(userGuessed!=-1 && parseFloat($scope.answer).toFixed(2) == parseFloat(userGuessed).toFixed(2)) $scope.score += 100;
			$scope.generateQuestion();
		};

		//toggle the View Scores button text and toggle the scoreboard visibility
		$scope.viewHighScores = function(){
			var scoresButton = $("a[ng-click='viewHighScores()']");
			if(!$scope.showScores) scoresButton.text("Hide Scores");
			else scoresButton.text("View Scores");
			$scope.showScores = !$scope.showScores;
		};

		//make a call to generationQuestion so it generates one automagically
		$scope.generateQuestion();
	});
})();