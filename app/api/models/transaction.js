var transactionSchema = new Schema
  ({ 
    Id: Schema.Types.ObjectId,
    TransactionDate: String,
    ProviderName: String,
    Type: String,
    PaymentStatus: String,
    Amount: {type: Number, get: getPrice, set: setPrice },
    currency: String
  });

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}
module.exports = Transaction = mongoose.model('Transaction', transactionSchema);
