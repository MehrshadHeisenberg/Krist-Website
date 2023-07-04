const UserModel = require("./../models/User")
const { isValidObjectId } = require("mongoose")

module.exports = async (req,res,next) => {
    const { adminId } = req.body

    if (isValidObjectId(adminId)) {
        const user = await UserModel.findById({_id: adminId})

        if(user) {
            if(user.role === "ADMIN") {
                next()
            }else {
                res.status(403).send({message: "this rout is accessible only for admins"})
            }
        }else {
            res.status(404).send({message : "user not found"})
        }
    }else {
        res.status(422).send({message : "invalid admin id"})
    }

}