const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        trim:true,
        minLength:3
    },
    email:String,
    password:String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[]
        },
    picture:String
})

module.exports = mongoose.model("user",userSchema)