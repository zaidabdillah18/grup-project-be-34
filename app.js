require("dotenv").config();
const express = require("express");
var app = express(),bodyParser = require('body-parser');
const port = 5000;
const cors = require('cors')

const UserRouter = require('./routes/user')
const datapenyandangRouter = require('./routes/datapenyandang')
const datamitraRouter = require('./routes/datamitra')
const homemitraRouter = require('./routes/homemitra')
const programmitraRouter = require('./routes/programmitra')
const homepenyandangRouter = require('./routes/homepenyandang')
const programpenyandangRouter = require('./routes/programpenyandang')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user",UserRouter);
app.use("/profile",datapenyandangRouter);
app.use("/profile",datamitraRouter);
app.use("/homemitra",homemitraRouter);
app.use("/programmitra",programmitraRouter);
app.use("/homepenyandang",homepenyandangRouter);
app.use("/programpenyandang",programpenyandangRouter);


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
  })