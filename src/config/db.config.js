//Set up mongoose connection
const mongoose = require('mongoose');
//remove before committing code
const username = process.env.mongoUser;
const password = process.env.mongoPassword;
const rawUrl = process.env.mongoUrl;
const mongoDbUri ='mongodb://admin:admin123@ds117535.mlab.com:17535/meandb' //rawUrl.replace('{username}', username).replace('{password}', password)
mongoose.connect(mongoDbUri);
mongoose.Promise = global.Promise;
module.exports = mongoose;