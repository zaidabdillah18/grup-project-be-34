const express = require('express');
const multer = require("multer");
const path = require('path')
const router = express.Router();
//ini menuju ke controller
const datapenyandangController = require('../controllers/datapenyandang.controller');
const datamitraController = require('../controllers/datamitra.controller');
//nambah data penyandang
const fileStroge = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
  }
  const upload = multer({
    storage:fileStroge,
    fileFilter: fileFilter
  })
router.get("/allpenyandang", datapenyandangController.getallpenyandang)
router.post("/datapribadi", datapenyandangController.createDatapribadi);
router.get("/datapribadi", datapenyandangController.getDataPribadi);
router.put("/datapribadi", datapenyandangController.editDataPribadi);
router.post("/datapribadi/kontakpribadi/:id", datapenyandangController.createkontakpribadi);
router.post("/datapribadi/kontakpribadi/upload_berkas/:id", upload.single('file_ktp') ,datapenyandangController.creatuploadberkas);

//login
// router.post("/lihat", datapenyandangController.lihat)

module.exports = router;