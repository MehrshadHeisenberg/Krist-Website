const express = require("express");
require("./configs/db")
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log("app is running...");
});
