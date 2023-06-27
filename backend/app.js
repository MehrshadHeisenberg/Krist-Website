const express = require("express");
const usersRouter = require("./routes/users")
require("./configs/db")
require("dotenv").config();

const app = express();
app.use(express.json())

app.use("/api/users" , usersRouter)

app.listen(process.env.PORT, () => {
    console.log("app is running...");
});
