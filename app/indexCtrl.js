'use strict';
var indexCtrl = function($scope, $http) {
	$scope.master= {};
	$scope.result = {};
	$scope.success = false;
    $scope.currency ={};
    $scope.transactions = {};
    $scope.convertedValue=0;
	// $scope.getTransactions = function() {
	// 	$http.get('/api/transaction').
	// 		success(function(data, status, headers, config) {
	// 			console.log(JSON.stringify(data));
	// 			$scope.result = data.id;
	// 			console.log("id:" + $scope.result)
	// 			$scope.success = true;
	// 		}).
	// 		error(function(data, status, headers, config) {
	// 			$scope.result = 'Error! ' + data;
	// 		});
	// };
	
	$scope.convert = function(currency) {
        $scope.currency.from ="USD";
        $scope.currency.to="INR";
		$scope.master.from = currency.from;
        $scope.master.to = currency.to;
        $scope.master.value = currency.value;
        console.log("sending request to:" + '/api/convert/' + currency.from + "/" + currency.to + "/" + currency.value);
        //console.log("http?");
    	//$.when(
    		$http.get('/api/convert/' + currency.from + "/" + currency.to + "/" + currency.value).
			success(function(data, status, headers, config) {
				console.log("Data:" + JSON.stringify(data));
				console.log("Converted value is: " + data.convertedValue);
				var convertedValue = parseFloat(data.convertedValue);
				if(convertedValue != NaN)
					$scope.convertedValue = convertedValue;
			}).
			error(function(data, status, headers, config) {
				console.log("Error");
				$scope.result = 'Error! ' + data;
			})
			//).done(function() { console.log("get call complete")}).error(function() {console.log("Did not complete");});
	};

}
