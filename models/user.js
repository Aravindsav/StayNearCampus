const { required } = require("joi");
const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});
// the hashing algorithm we are implementing is pbkdf2
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);