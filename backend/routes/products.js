const express = require("express");
const productsController = require("./../controllers/productsController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");

const Router = express.Router();

Router.route("/")
    .post(isAdmin, productsController.addOne)
    .get(productsController.getAll);
Router.route("/:productId")
    .put(isObjectId, isAdmin, productsController.updateOne)
    .delete(isObjectId, isAdmin, productsController.removeOne)
    .get(isObjectId , productsController.getOne)
Router.route("/review/:productId").post(isObjectId , productsController.addReview)


module.exports = Router;
