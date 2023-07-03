const ProductModel = require("./../models/Product");
const addProductValidator = require("./../validators/products/addProduct");

exports.addOne = (req, res) => {
    const { title, name, discription, price, color, size } = req.body;
    const validationResult = addProductValidator({
        title,
        name,
        discription,
        price,
        color,
        size,
    });

    if(validationResult !== true){
        return res.status(422).send({message : "invalid data"})
    }

    ProductModel.create({
        title,
        name,
        discription,
        price,
        color,
        size,
    })

    res.status(201).send({ message : "product created"})
};
