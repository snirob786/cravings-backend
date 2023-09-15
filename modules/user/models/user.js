/**
 * Customer Model
 * 
 * @version 1.1.0
 */

"use strict"

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    // General
    name: { type: String, trim: true },
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: String,
    referralUrl: String,
    role: { type: String, default: 'student' },
    createAt: { type: Date, default: Date.now },
    updateAt: Date
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true } });



// store this funciton in some helper file, instead of storing it in this Customer Model.
var hash_password = UserSchema.statics.hash_password = function (password) {
    let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
    return bcrypt.hashSync(password, salt);
};

UserSchema.methods.comparePassword = function (password) {
    if (!this.password) { return false; }
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function (next) {
    // check if password is present and is modified.
    if (this.password && this.isModified('password')) {
        this.password = hash_password(this.password);
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);
