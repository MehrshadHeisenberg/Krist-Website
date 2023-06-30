const { isValidObjectId } = require("mongoose")

module.exports = (req , res , next) => {
     const { addressId } = req.body

     if(isValidObjectId(addressId)) {
        next()
     }else {
        res.status(422).send({message : "invalid address id"})
     }
}