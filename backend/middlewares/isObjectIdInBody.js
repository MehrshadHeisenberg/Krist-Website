const { isValidObjectId } = require("mongoose")

module.exports = (req , res , next) => {
     const { addressId , cardId } = req.body

     if(isValidObjectId(addressId) || isValidObjectId(cardId)) {
        next()
     }else {
        res.status(422).send({message : "invalid address or card id"})
     }
}