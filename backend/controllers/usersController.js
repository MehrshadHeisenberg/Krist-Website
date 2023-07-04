const UserModel = require("./../models/User");
const ProductModel = require("./../models/Product")
const { ObjectId } = require("mongodb")
const registerValidator = require("./../validators/users/register");
const updateValidator = require("./../validators/users/update");

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
                    _id : new ObjectId(),
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
exports.deleteAddress = async (req, res) => {
    const { userId} = req.params
    const { addressId } = req.body

    const result = await UserModel.findByIdAndUpdate(userId, {
        $pull : {
            address : { _id : new ObjectId(addressId)}
        }
    })

    if (result) {
        res.status(201).send({
            message: `address deleted from ${result.firstName}'s profile`,
        });
    } else {
        res.status(404).send({ message: "user not found" });
    }

}
exports.addCard = async (req, res) => {
    const { userId } = req.params
    const { cardNumber , cardName , expiryDate , cvv} = req.body
    if (!cardNumber || !cardName || !expiryDate ||  !cvv ) {
        res.status(422).send({message : "invalid data"})
    } else {

        const result = await UserModel.findByIdAndUpdate(userId, {
            $addToSet : {
                cards : {
                    _id : new ObjectId(),
                    cardNumber,
                    cardName,
                    expiryDate,
                    cvv
                }
            }
        })

        if(result){
            res.status(201).send({ message : `new card added to ${result.firstName}'s profile`})
        }else {
            res.status(404).send({ message : `user not found`})
        }
    }
}
exports.deleteCard = async (req, res) => {
    const { userId} = req.params
    const { cardId } = req.body

    const result = await UserModel.findByIdAndUpdate(userId , {
        $pull : {
            cards : { _id : new ObjectId(cardId)}
        }
    })

    if(result){
        res.status(201).send({ message : `card deleted from ${result.firstName}'s profile`})
    }else {
        res.status(404).send({ message : `user not found`})
    }
}
exports.getAllNotifications = async (req, res) => {
    const { userId } = req.params

    const user = await UserModel.findById(userId)

    if(user) {
        res.status(200).send(user.notifications)
    }else {
        res.status(404).send({message : "user not found"})
    }
}
exports.updateInformation = async (req, res) => {
    const { userId } = req.params
    const { firstName, lastName, phoneNumber, email} = req.body

    const validationResult = updateValidator(req.body)

    if(validationResult !== true) {
        return res.status(422).send({ message : "invalid data"})
    }
    
    const result = await UserModel.findByIdAndUpdate(userId , {
        $set : {
            firstName,
            lastName,
            phoneNumber,
            email,
        }
    })

    if(result) {
        res.status(201).send({ message : `${result.firstName}'s profile has changed`})
    }else {
        res.status(404).send({ message : "user not found"})
    }
}
exports.addToBasket = async (req,res) => {
    const { userId , productId} = req.params

    const product = await ProductModel.findById(productId)

    if(product) {
        const user = await UserModel.findByIdAndUpdate(userId , {
            $addToSet : {
                basket : product
            }
        })

        if(user) {
            res.status(201).send({ message : `${product.name} added to ${user.firstName}'s basket`})
        }else {
            res.status(404).send({ message : "user not found"})
        }
    }else {
        res.status(404).send({ message : "product not found"})
    }
}
exports.deleteFromBasket = async (req, res) => {
    const { userId , productId} = req.params

    const product = await ProductModel.findById(productId)

    if(product) {
        const user = await UserModel.findByIdAndUpdate(userId, {
            $pull : {
                basket : { _id : new ObjectId(productId)}
            }
        })
        
        if(user) {
            res.status(201).send({ message : `${product.name} deleted from ${user.firstName}'s basket`})
        }else {
            res.status(404).send({ message : "user not found"})
        }
    }else {
        res.status(404).send({ message : "product not found"})
    }

}