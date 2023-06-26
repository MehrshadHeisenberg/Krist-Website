const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.dbUrL;

mongoose
    .connect(dbUrl)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
