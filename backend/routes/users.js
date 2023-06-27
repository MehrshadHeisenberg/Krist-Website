const express = require("express")
const usersController = require("./../controllers/usersController")


const Router = express.Router()

Router.route("/").post(usersController.addOne)

module.exports = Router