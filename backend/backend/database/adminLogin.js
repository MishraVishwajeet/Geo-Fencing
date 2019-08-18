var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    pass: String,
    time:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('user',userSchema);