'use strict';
module.exports = {
    convert : function(req, res) {
        var from = req.params.from;
        var to = req.params.to;
        var value = req.params.value;
        console.log("Converting currency from " + from + " to " + to + " for value: " + value);
        //Do the currency conversion logic here
        console.log('Retrieving All currencies..');
        var fromToUSD = currencies[from];
        var ToToUSD= currencies[to];
        var valueToUSD = fromToUSD * value;
        var convertedValue = ToToUSD * valueToUSD;
        console.log("Converted value:" + convertedValue);
        var responseData = {"convertedValue" : convertedValue};
         res.send(responseData);
    },
    getRealcurrencies: function() {
        //fetch from http://openexchangerates.org/api/latest.json?app_id=dd988d8bce8f4705b7c95712be3669c7
        // and update Global variable with it
        return {"AED": 3.673226,"AFN": 57.220925,"ALL": 101.864169,"AMD": 417.835999,"ANG": 1.789,"AOA": 97.702301,"ARS": 8.002222,"AUD": 1.082739,"AWG": 1.783775,"AZN": 0.783933,"BAM": 1.426098,"BBD": 2,"BDT": 77.810299,"BGN": 1.425399,"BHD": 0.377012,"BIF": 1549.168333,"BMD": 1,"BND": 1.264658,"BOB": 6.924902,"BRL": 2.278509,"BSD": 1,"BTC": 0.0022842863,"BTN": 60.178938,"BWP": 8.845124,"BYR": 9915.64,"BZD": 2.018154,"CAD": 1.103103,"CDF": 922.594167,"CHF": 0.891392,"CLF": 0.02354,"CLP": 556.180001,"CNY": 6.206016,"COP": 1967.783325,"CRC": 547.608298,"CUP": 1.001525,"CVE": 79.9711,"CZK": 20.00549,"DJF": 178.094999,"DKK": 5.441213,"DOP": 43.07902,"DZD": 78.99728,"EEK": 11.6522,"EGP": 6.973504,"ERN": 14.952575,"ETB": 19.44983,"EUR": 0.729227,"FJD": 1.848324,"FKP": 0.602886,"GBP": 0.602886,"GEL": 1.75611,"GHS": 2.702803,"GIP": 0.602886,"GMD": 38.10729,"GNF": 6963.595,"GTQ": 7.761213,"GYD": 204.798749,"HKD": 7.757282,"HNL": 19.24984,"HRK": 5.570994,"HTG": 44.71048,"HUF": 223.647099,"IDR": 11320.85,"ILS": 3.474487,"INR": 60.21465,"IQD": 1165.015,"IRR": 25278.333333,"ISK": 112.916,"JEP": 0.602886,"JMD": 109.445699,"JOD": 0.707858,"JPY": 103.9336,"KES": 86.624829,"KGS": 54.488999,"KHR": 4006.535,"KMF": 358.846689,"KPW": 900,"KRW": 1057.010016,"KWD": 0.282033,"KYD": 0.827602,"KZT": 182.324799,"LAK": 8047.316667,"LBP": 1503.89,"LKR": 130.666699,"LRD": 85.5,"LSL": 10.66016,"LTL": 2.516278,"LVL": 0.511769,"LYD": 1.246279,"MAD": 8.182956,"MDL": 13.47318,"MGA": 2347.925,"MKD": 44.95786,"MMK": 963.73892,"MNT": 1776.583333,"MOP": 8.001933,"MRO": 294.6483,"MTL": 0.683602,"MUR": 30.18949,"MVR": 15.40614,"MWK": 410.4345,"MXN": 13.12259,"MYR": 3.286756,"MZN": 31.30365,"NAD": 10.65882,"NGN": 163.7845,"NIO": 25.74857,"NOK": 6.004076,"NPR": 96.568261,"NZD": 1.169637,"OMR": 0.385031,"PAB": 1,"PEN": 2.815326,"PGK": 2.754248,"PHP": 45.01216,"PKR": 98.18544,"PLN": 3.03582,"PYG": 4451.289974,"QAR": 3.641647,"RON": 3.256838,"RSD": 84.220899,"RUB": 35.57146,"RWF": 680.7481,"SAR": 3.750519,"SBD": 7.274129,"SCR": 12.08857,"SDG": 5.695105,"SEK": 6.53519,"SGD": 1.263557,"SHP": 0.602886,"SLL": 4336.666667,"SOS": 992.589125,"SRD": 3.263333,"STD": 17825.5,"SVC": 8.767748,"SYP": 143.6761,"SZL": 10.6614,"THB": 32.52609,"TJS": 4.8483,"TMT": 2.85,"TND": 1.586846,"TOP": 1.832218,"TRY": 2.135772,"TTD": 6.45088,"TWD": 30.33625,"TZS": 1628.716667,"UAH": 11.44779,"UGX": 2554.296667,"USD": 1,"UYU": 22.82287,"UZS": 2264.953311,"VEF": 6.291846,"VND": 21092.616667,"VUV": 95.115,"WST": 2.307214,"XAF": 477.910979,"XAG": 0.05048864,"XAU": 0.0007778,"XCD": 2.70154,"XDR": 0.648602,"XOF": 478.040482,"XPF": 87.0943,"YER": 215.016499,"ZAR": 10.63845,"ZMK": 5253.075255,"ZMW": 6.150038,"ZWL": 322.355006};
    },
    updateConversion : function() {
        GLOBAL.currencies = this.getRealcurrencies();
    }
}
