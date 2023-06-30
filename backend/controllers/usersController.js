const UserModel = require("./../models/User");
const registerValidator = require("./../validators/users/register");

exports.getAll = async (req, res) => {
    const users = await UserModel.find({}).lean();
    res.status(200).send(users);
};
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
exports.findOne = async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({ message: "user not found" });
    }
};
exports.promote = async (req, res) => {
    const { userId } = req.params;

    const user = await UserModel.findByIdAndUpdate(userId, {
        $set: {
            role: "ADMIN",
        },
    });

    if (user) {
        if (user.role === "ADMIN") {
            res.status(400).send({ message: "user is admin" });
        } else {
            res.status(201).send({
                message: `${user.firstName} was promoted to 'Admin'`,
            });
        }
    } else {
        res.status(404).send({ message: "user not found" });
    }
};
exports.addAddress = async (req, res) => {
    const { userId } = req.params;
    const { name, phoneNumber, building, area, city, pinCode, state } =
        req.body;

    if (!name ||!phoneNumber ||!building ||!area ||!city ||!pinCode ||!state) {
        res.status(422).send({ message: "invalid data" });
    } else {
        const result = await UserModel.findByIdAndUpdate(userId, {
            $addToSet: {
                address: {
                    name,
                    phoneNumber,
                    building,
                    area,
                    city,
                    pinCode,
                    state,
                },
            },
        });
        if (result) {
            res.status(201).send({
                message: `new address added to ${result.firstName}'s profile`,
            });
        } else {
            res.status(404).send({ message: "user not found" });
        }
    }
};