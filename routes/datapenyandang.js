const express = require('express');
const router = express.Router();
//ini menuju ke controller
const datapenyandangController = require('../controllers/datapenyandang.controller');
//nambah data penyandang
router.post("/datapribadi", datapenyandangController.createDatapribadi);
router.post("/datapribadi/kontakpribadi/:id", datapenyandangController.createkontakpribadi);
router.post("/datapribadi/kontakpribadi/upload_berkas/:id", datapenyandangController.creatuploadberkas);
//login
// router.post("/lihat", datapenyandangController.lihat)

module.exports = router;