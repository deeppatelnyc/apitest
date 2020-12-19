require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require("./api/user/user.router");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log("server running");
});
