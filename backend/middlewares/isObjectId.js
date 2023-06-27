const { isValidObjectId } = require("mongoose")

module.exports = (req , res , next) => {
     const { id } = req.params

     if(isValidObjectId(id)) {
        next()
     }else {
        res.status(422).send({message : "invalid id"})
     }
}