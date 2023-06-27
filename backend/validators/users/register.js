const Validator = require("fastest-validator")
const v = new Validator()

const schema = {
    firstName: {
        type: "string",
        min: 3,
        max: 30,
    },
    lastName: {
        type: "string",
        min: 3,
        max: 30,
    },
    email: {
        type: "string",
    },
    password: {
        type: "string",
        min: 8,
    },
    $$strict : true
}

const check = v.compile(schema)
module.exports = check