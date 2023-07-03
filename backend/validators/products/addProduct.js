const Validator = require("fastest-validator")
const v = new Validator()

const schema = {
    title : {
        type : "string",
        min : 3
    },
    name : {
        type : "string",
        min : 3
    },
    discription : {
        type : "string",
        min : 10,
    },
    price : {
        type : "number",
    },
    color : {
        type : "array",
        min : 1
    },
    size : {
        type : "array",
        min : 1
    }
}

const check = v.compile(schema)
module.exports = check