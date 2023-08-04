const ProductModel = require("./../models/Product");
const { ObjectId } = require("mongodb")
const addProductValidator = require("./../validators/products/addProduct");

exports.getAll = async (req , res) => {
    // let queryObj = { ...req.query }
    // const excludedFields = ['page', 'sort', 'limit', 'fields']
    // excludedFields.forEach(el => delete queryObj[el])

    // let queryStr = JSON.stringify(queryObj)
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, el => `$${el}`)
    // queryObj = JSON.parse(queryStr)

    // const products = await ProductModel.find(queryObj).lean()
    const products = await ProductModel.find({}).lean()

    if(products){
        res.status(200).send(products)
    }else {
        res.status(400).send({ message : "something went wrong!!"})
    }
}
exports.getOne = async (req, res) => {
    const { productId } = req.query 
    const product = await ProductModel.findById(productId)

    if(product){
        res.status(200).send(product)
    }else {
        res.status(404).send({ message : "product not found"})
    }
}
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

    if (validationResult !== true) {
        return res.status(422).send({ message: "invalid data" });
    }

    ProductModel.create({
        title,
        name,
        discription,
        price,
        color,
        size,
    });

    res.status(201).send({ message: "product created" });
};
exports.updateOne = async (req, res) => {
    const { productId } = req.query;
    const { title, name, discription, price, color, size } = req.body;

    const validationResult = addProductValidator({
        title,
        name,
        discription,
        price,
        color,
        size,
    })

    if(validationResult !== true) {
        return res.status(422).send({ message: "invalid data" });
    }
    const product = await ProductModel.findByIdAndUpdate(productId, {
        $set: {
            title,
            name,
            discription,
            price,
            color,
            size
        },
    });

    if(product) {
        res.status(201).send({ message : `${product.name} informations has changed`})
    }else {
        res.status(402).send({ message : "prduct not found"})
    }
};
exports.removeOne = async (req, res) => {
    const { productId } = req.query

    const product = await ProductModel.findByIdAndDelete(productId)

    if(product) {
        res.status(200).send({ message : `${product.name} has deleted`})
    }else {
        res.status(402).send({ message : "prduct not found"})
    }
};
exports.addReview = async (req,res) => {
    const { productId } = req.query
    const { name , email , description} = req.body

    if(name && email && description) {
        const product = await ProductModel.findByIdAndUpdate(productId , {
            $addToSet : {
                reviews : {
                    _id : new ObjectId(),
                    name,
                    email,
                    description,
                    createdAt : new Date()
                }
            }
        })

        if(product){
            res.status(201).send({ message : `review added to ${product.name}'s reviews`})
        }else {
            res.status(404).send({ message : "product not found"})
        }
    }else {
        res.status(422).send({ message : "invalid data"})
    }
}
