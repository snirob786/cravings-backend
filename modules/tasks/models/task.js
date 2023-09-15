/**
 * Customer Model
 * 
 * @version 1.1.0
 */

"use strict"

var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    // General
    title: { type: String, trim: true },
    sumissionDate: { type: Date },
    description: { type: String },
    status: { type: String, default: "active" },
    postedBy: { type: mongoose.Types.ObjectId || String, ref: "User" },
    createAt: { type: Date, default: Date.now },
    updateAt: Date
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true } });



// store this funciton in some helper file, instead of storing it in this Customer Model.

// BatchSchema.pre('save', function (next) {
//     next();
// });

module.exports = mongoose.model("Task", TaskSchema);
