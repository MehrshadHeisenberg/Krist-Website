const UserModel = require("./../models/User");
const registerValidator = require("./../validators/users/register");

exports.addOne = async (req, res) => {
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
