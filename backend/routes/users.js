const express = require("express");
const usersController = require("./../controllers/usersController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");

const Router = express.Router();

Router.route("/")
    .get(isAdmin, usersController.getAll)
    .post(usersController.addOne);
Router.route("/:userId").get(isObjectId, usersController.findOne);
Router.route("/promote/:userId").put(isObjectId, isAdmin, usersController.promote);

module.exports = Router;
