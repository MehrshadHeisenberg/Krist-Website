const { isValidObjectId } = require("mongoose")

module.exports = (req , res , next) => {
     const { userId , productId , addressId } = req.params

     if(isValidObjectId(userId) || isValidObjectId(productId) || isValidObjectId(addressId)) {
        next()
     }else {
        res.status(422).send({message : "invalid user or product id"})
     }
}