const express = require("express");

var app = express();
const UserRouter = require('./routes/user')

app.use("/user",UserRouter);

app.listen(5000, function () {
console.log("Started application on port %d", 5000);
});