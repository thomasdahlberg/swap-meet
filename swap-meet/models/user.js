const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: String,
    adminUser: Boolean,
    rating: Number,
    active: Boolean,
    seeking: Array
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);
