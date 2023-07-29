const express = require("express");
const usersRouter = require("./routes/users")
const productsRouter = require("./routes/products")
const cors = require("cors")
require("./configs/db")
require("dotenv").config();

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/users" , usersRouter)
app.use("/api/products" , productsRouter)

app.listen(process.env.PORT, () => {
    console.log("app is running...");
});
