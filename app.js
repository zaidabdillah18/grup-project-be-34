const express = require("express");
const multer = require("multer");
var app = express(),bodyParser = require('body-parser');
const UserRouter = require('./routes/user')
const datapenyandangRouter = require('./routes/datapenyandang')

const fileStroge = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime()+'-'+file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
  }
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage: fileStroge,fileFilter: fileFilter}).single('file_ktp'))
app.use("/user",UserRouter);
app.use("/datapenyandang",datapenyandangRouter);

app.listen(5000, function () {
console.log("Started application on port %d", 5000);
});