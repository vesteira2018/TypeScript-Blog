const mongoose = require('mongoose');

let boardSchema = mongoose.Schema({
    category: String,
    writer: String,
    password: String,
    contents: String,
    comments: [{
        name: String,
        memo: String,
        date: {type: Date, default: Date.now}
    }],
    count: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
});