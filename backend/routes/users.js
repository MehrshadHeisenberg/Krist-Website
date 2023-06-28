const express = require("express");
const usersController = require("./../controllers/usersController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");

const Router = express.Router();

Router.route("/")
    .get(isAdmin, usersController.getAll)
    .post(usersController.addOne);
Router.route("/:id").get(isObjectId, usersController.findOne);

module.exports = Router;
