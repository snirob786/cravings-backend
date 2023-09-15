/**
 * Customer Model
 * 
 * @version 1.1.0
 */

"use strict"

var mongoose = require('mongoose');

var TaskSubmissionSchema = new mongoose.Schema({
    // General
    task: { type: mongoose.Types.ObjectId || String, ref: "Task" },
    sumissionDate: { type: Date },
    description: { type: String },
    status: { type: String, default: "active" },
    submittedBy: { type: mongoose.Types.ObjectId || String, ref: "User" },
    submittedAt: { type: Date, default: Date.now },
    submittedData: {
        image: { type: String },
        url: { type: String }
    },
    createAt: { type: Date, default: Date.now },
    updateAt: Date
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true } });



// store this funciton in some helper file, instead of storing it in this Customer Model.

// BatchSchema.pre('save', function (next) {
//     next();
// });

module.exports = mongoose.model("TaskSubmission", TaskSubmissionSchema);
