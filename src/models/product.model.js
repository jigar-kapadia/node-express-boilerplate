const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image : { type: Buffer, required: true }

});

module.exports = mongoose.model('Product', productSchema);

