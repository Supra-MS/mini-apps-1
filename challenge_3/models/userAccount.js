const mongoose = require('mongoose');
const shortid = require('shortid');

const userAccountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    default: shortid.generate // === () => shortid.generate()
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
console.log('Inside user account db called!!!');
// hooks up the db and the model of the schema
module.exports = mongoose.model('userAccount', userAccountSchema);