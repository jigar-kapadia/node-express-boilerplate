const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const TestSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 contact: {
  type: Number,
  trim: true,
  required: true
 }
});
module.exports = mongoose.model('Test', TestSchema)