'use strict';
var Transaction = require('../models/transaction.js');
module.exports = {

	findAll : function(req, res) {
		console.log('Retrieving All transactions..');
		Transaction.find({}, function(err, transactionsResult) {
			if( err || !transactionsResult) 
			{
				console.log('No transactions found');
				res.send('No transactions found');
			}
			else if(transactionsResult.length==0)
			{
				console.log('No transactions available');
				res.send('No transactions available');
			}
			else
			{
				var allTransactions = [];
				for (var i = 0; i <= transactionsResult.length - 1; i++) {
					allTransactions.push(new Transaction(transactionsResult[i]));
				};
				res.send(allTransactions);
			}
		});
	},

	findById : function(req, res) {
		var id = req.params.id;
		console.log('Retrieving a transaction..');
		Transaction.findById(id, function(err, transactionsResult) {
			if(err || !transactionsResult)
			{
				console.log('No transaction found');
				res.send('No transaction found');
			}
			console.log(JSON.stringify(transactionsResult));
			res.send(transactionsResult);
		});
	},
	
	addTransaction : function(req, res) {
		var TransactiontoAdd = req.body;
		console.log("new transaction" + JSON.stringify(TransactiontoAdd));
		var newTransaction = new Transaction(TransactiontoAdd);
		console.log('Adding transaction..' + JSON.stringify(newTransaction));
		newTransaction.save(function(err, saved) {
			if( err || !saved ) {
				console.log('Transaction not saved');
				res.send(500);
			}
			else 
				console.log('Transaction saved');
			res.json({"id": newTransaction._id});
		});
	},

	updateTransaction : function(req, res) {
		var id = req.params.id;
		var transactionToUpdate = req.body;
		console.log("Transaction:" + JSON.stringify(transactionToUpdate));
		var updatedTransaction = new Transaction(transactionToUpdate);
		console.log('Updating transaction..');
		Transaction.findOne({_id: ObjectId(id)}, function (err, transaction) {
		  if (!transaction) {
		    transaction = new Transaction();
		  }
		  for(var prop in transactionToUpdate)
	  		transaction[prop] = transactionToUpdate[prop];
	  	transaction.save(function(err, saved) {
				if( err || !saved ) {
					console.log('Transaction not saved');
					res.send(500);
				}
				else 
					console.log('Transaction saved');
				res.send(200);
			});
		});
	},

	deleteTransaction : function(req,res) {
		var id = req.params.id;
		console.log('Retrieving transaction..');
		Transaction.findOne({_id: ObjectId(id)}, function (err, transaction) {
			if (!transaction) {
			  transaction = new Transaction();
			}
			transaction.deleted = true;
		  transaction.save(function(err, saved) {
					if( err || !saved ) {
						console.log('Transaction not saved');
						res.send(500);
					}
					else {
						console.log('Transaction saved');
						res.send(200);
					}
				});
		 });
	}
}