const express = require("express");
var app = express(),bodyParser = require('body-parser');

const UserRouter = require('./routes/user')
const datapenyandangRouter = require('./routes/datapenyandang')
const datamitraRouter = require('./routes/datamitra')
const homemitraRouter = require('./routes/homemitra')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user",UserRouter);
app.use("/daftarpenyandang",datapenyandangRouter);
app.use("/daftarmitra",datamitraRouter);
app.use("/homemitra",homemitraRouter);
app.listen(5000, function () {
console.log("Started application on port %d", 5000);
});