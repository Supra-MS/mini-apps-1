const mongoose = require('mongoose');
const shortid = require('shortid');

const userPIISchema = new mongoose.Schema({
  address1: {
    type: String,
    required: true,
    default: shortid.generate
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  zip: {
    type: Number,
    required: true,
  }
});
console.log('Inside user pii db called!!!');
// hooks up the db and the model of the schema
module.exports = mongoose.model('userPII', userPIISchema);