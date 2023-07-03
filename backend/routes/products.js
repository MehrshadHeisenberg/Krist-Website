const express = require("express");
const productsController = require("./../controllers/productsController");
const isObjectId = require("./../middlewares/isObjectId");
const isAdmin = require("./../middlewares/isAdmin");


const Router = express.Router()

Router.route("/").post(isAdmin , productsController.addOne)

module.exports = Router
