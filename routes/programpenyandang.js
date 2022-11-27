const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path')
//ini menuju ke controller
const programpenyandangController = require('../controllers/programpenyandang.controller');

router.get("/lihat", programpenyandangController.programkategoripenyandang);
router.get("/lihat/:id", programpenyandangController.detailprogramkategori);
router.get("/lihat/detail/:id", programpenyandangController.detailprogram);
router.post("/lihat/detail/daftar", programpenyandangController.daftarprogram);
// router.get("/lihat/:id", programpenyandangController.detailprogrammitra);

module.exports = router;