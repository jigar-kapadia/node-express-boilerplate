const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const roundSalt = process.env.RoundSalt;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true
    }
});

// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, roundSalt);
    next();
});

module.exports = mongoose.model('User', UserSchema);