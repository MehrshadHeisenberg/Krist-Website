const UserModel = require("./../models/User");
const registerValidator = require("./../validators/users/register");

exports.addOne = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const validationResult = registerValidator(req.body);

    if (validationResult !== true) {
        return res.status(422).send({ message: "invalid data" });
    }
    
    UserModel.create({
        firstName,
        lastName,
        email,
        password,
    });

    res.status(201).send({ message: "user created" });
};
exports.findOne = async(req,res) => {
    const { id } = req.params
    const user = await UserModel.findById({ _id : id})

    if(user) {
        res.status(200).send(user)
    }else {
        res.status(404).send({ message: "user not found"})
    }
}