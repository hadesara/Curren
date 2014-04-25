'use strict';
var http = require('http');
var request = require('request');
module.exports = {
    convert : function(req, res) {
        var from = req.params.from;
        var to = req.params.to;
        var value = req.params.value;
        console.log("Converting currency from " + from + " to " + to + " for value: " + value);
        console.log('Retrieving All currencies..');
        var fromToUSD = currencies[from];
        var ToToUSD= currencies[to];
        var valueToUSD = fromToUSD * value;
        var convertedValue = ToToUSD * valueToUSD;
        console.log("Converted value:" + convertedValue);
        var responseData = {"convertedValue" : convertedValue};
         res.send(responseData);
    },

 convertCurrency : function(from, to, value) {
        var fromToUSD = currencies[from];
        var ToToUSD= currencies[to];
        var valueToUSD = fromToUSD * value;
        var convertedValue = ToToUSD * valueToUSD;
         return convertedValue;
    },

    getRealcurrencies: function(callback) {
        request('http://openexchangerates.org/api/latest.json?app_id=dd988d8bce8f4705b7c95712be3669c7', function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            callback(result.rates);
            return result.rates;
            }
        });
    },
    updateConversion : function() {
        this.getRealcurrencies(function(rates) {
            GLOBAL.currencies = rates;
        });
    }
}
