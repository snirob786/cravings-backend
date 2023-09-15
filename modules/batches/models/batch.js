/**
 * Customer Model
 * 
 * @version 1.1.0
 */

"use strict"

var mongoose = require('mongoose');

var BatchSchema = new mongoose.Schema({
    // General
    name: { type: String, trim: true },
    registrationStatus: { type: String, default: 'inactive' },
    status: { type: String, default: 'inactive' },
    createAt: { type: Date, default: Date.now },
    updateAt: Date
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true } });



// store this funciton in some helper file, instead of storing it in this Customer Model.

// BatchSchema.pre('save', function (next) {
//     next();
// });

module.exports = mongoose.model("Batch", BatchSchema);
