const express = require("express");
const usersController = require("./../controllers/usersController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");


const Router = express.Router();

Router.use(isObjectId)

Router.route("/")
    .get(isAdmin, usersController.getAll)
    .post(usersController.addOne);

Router.route("/find") // /find?userId
    .get(usersController.findOne);

Router.route("/promote") // /promote?userId
    .put(isAdmin,usersController.promote);

Router.route("/address") // /address?userId
    .post(usersController.addAddress)
    .delete(usersController.deleteAddress); // /address?userId&addressId

Router.route("/card") // /card?userId
    .post(usersController.addCard)
    .delete(usersController.deleteCard); // /card?userId&cardId

Router.route("/notification") // /notification?userId
    .get(usersController.getAllNotifications)

Router.route("/information") // /information?userId
    .put(usersController.updateInformation)

Router.route("/basket") // /basket?userId&productId  
    .post(usersController.addToBasket)
    .delete(usersController.deleteFromBasket)

Router.route("/wishlist") // /wishlist?userId&productId  
    .post(usersController.addToWishlist)
    .delete(usersController.deleteFromWishlist)
    
module.exports = Router;
