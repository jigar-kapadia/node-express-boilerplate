//Set up mongoose connection
const mongoose = require('mongoose');
//remove before committing code
const username = process.env.mongoUser || 'admin';
const password = process.env.mongoPassword || 'admin123';
const mongoDbUri = `mongodb://${username}:${password}@ds117535.mlab.com:17535/meandb`;
mongoose.connect(mongoDbUri);
mongoose.Promise = global.Promise;
module.exports = mongoose;