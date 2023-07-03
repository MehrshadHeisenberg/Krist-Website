const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 3
    },
    name : {
        type : String,
        required : true,
        minLength : 3
    },
    discription : {
        type : String,
        required : true,
        minLength : 10,
    },
    price : {
        type : Number,
        required : true
    },
    color : {
        type : Object,
        required : true,
        minLength : 1
    },
    size : {
        type : Object,
        required : true,
        minlength : 1
    },
    reviews : {
        type : Object,
        default : []
    }
}, { versionKey : false })

const productModel = mongoose.model("products", schema)
module.exports = productModel