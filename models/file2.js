const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const birthdaySchema = new Schema({
    person: {
        type:String,
        required: true
    },
    birthdayDate: {
        type:Date,
        required: true
    }
}, { timestamps: true });

const Birthday = mongoose.model('Birthday', birthdaySchema);
module.exports = Birthday;