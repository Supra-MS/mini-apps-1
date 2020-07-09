const mongoose = require('mongoose');
const shortid = require('shortid');

const userPaymentSchema = new mongoose.Schema({
  ccName: {
    type: String,
    required: true
  },
  ccNumber: {
    type: Number,
    required: true,
    default: shortid.generate // === () => shortid.generate()
  },
  expiry: {
    type: Date,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  billZip: {
    type: Number,
    required: true,
  }
});
console.log('Inside user payment db called!!!');
// hooks up the db and the model of the schema
module.exports = mongoose.model('userPayment', userPaymentSchema);