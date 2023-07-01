const express = require("express");
const usersController = require("./../controllers/usersController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");
const isObjectIdInBody = require("../middlewares/isObjectIdInBody");

const Router = express.Router();

Router.route("/")
    .get(isAdmin, usersController.getAll)
    .post(usersController.addOne);

Router.route("/:userId")
    .get(isObjectId, usersController.findOne);

Router.route("/promote/:userId")
    .put(isObjectId,isAdmin,usersController.promote);

Router.route("/address/:userId")
    .post(isObjectId, usersController.addAddress)
    .delete(isObjectId, isObjectIdInBody, usersController.deleteAddress);

Router.route("/cards/:userId")
    .post(isObjectId, usersController.addCard)
    .delete(isObjectId, isObjectIdInBody, usersController.deleteCard);

Router.route("/notifications/:userId")
    .get(isObjectId , usersController.getAllNotifications)
module.exports = Router;
