const express = require("express");
const usersController = require("./../controllers/usersController");
const isObjectId = require("./../middlewares/isObjectId");

const Router = express.Router();

Router.route("/").post(usersController.addOne);
Router.route("/:id").get(isObjectId, usersController.findOne);

module.exports = Router;
