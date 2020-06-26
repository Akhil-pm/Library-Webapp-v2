const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/library');
const Schema= mongoose.Schema;

const  SignupSchema = new Schema({

    name:String,
    username:String,
    phonenumber:Number,
    email:String,
    password:String,

});
var SignupData = mongoose.model('signupdata',SignupSchema);
module.exports=SignupData;