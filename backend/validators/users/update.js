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
    }
}

const check = v.compile(schema)
module.exports = check