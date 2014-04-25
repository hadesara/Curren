'use strict';
var indexCtrl = function($scope, $http) {
	$scope.result = {};
    $scope.currency ={};
    $scope.transaction = {};
    $scope.transactions = {};
    $scope.convertedValue=0;
	$scope.getTransactions = function(currency) {
		$scope.currency = currency;
		$http.get('/api/transaction/' + currency).
			success(function(data, status, headers, config) {
				console.debug(JSON.stringify($scope.transactions));
				$scope.transactions = data;
			}).
			error(function(data, status, headers, config) {
				$scope.result = 'Error! ' + data;
			});
	};

	$scope.add = function(transaction) {
		console.log(JSON.stringify(transaction));
		$scope.transaction.TransactionDate = transaction.transactionDate;
		$scope.transaction.ProviderName = transaction.provider;
		$scope.transaction.Type = transaction.type;
		$scope.transaction.PaymentStatus = transaction.status;
		$scope.transaction.Amount = transaction.amount;
		$scope.transaction.currency = transaction.currency;
		$http.post('/api/transaction', $scope.transaction).
			success(function(data, status, headers, config) {
				$scope.result = data.id;
				console.debug("id:" + $scope.result);
				$scope.transaction = null;
				$scope.getTransactions($scope.currency);
				
			}).
			error(function(data, status, headers, config) {
				$scope.result = 'Error! ' + data;
			});
	};

	$scope.convert = function(currency) {
        console.debug("sending request to:" + '/api/convert/' + currency.from + "/" + currency.to + "/" + currency.value);
    		$http.get('/api/convert/' + currency.from + "/" + currency.to + "/" + currency.value).
			success(function(data, status, headers, config) {
				console.log("Converted value is: " + data.convertedValue);
				var convertedValue = parseFloat(data.convertedValue);
				if(convertedValue != NaN)
					$scope.convertedValue = convertedValue;
			}).
			error(function(data, status, headers, config) {
				$scope.result = 'Error! ' + data;
			});
	};
}
