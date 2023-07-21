const express = require("express");
const productsController = require("./../controllers/productsController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");

const Router = express.Router();

Router.use(isObjectId)

Router.route("/")
    .post(isAdmin, productsController.addOne)
    .get(productsController.getAll);

Router.route("/product") // /product?productId
    .put(isAdmin, productsController.updateOne)
    .delete(isAdmin, productsController.removeOne)
    .get(productsController.getOne)

Router.route("/review") // /review?productId
    .post(productsController.addReview)


module.exports = Router;
