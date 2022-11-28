const express = require('express');
const router = express.Router();

//ini menuju ke controller
const kegiatanpenyandangController = require('../controllers/kegiatanpenyandang.controller');

router.get("/lihat/:id", kegiatanpenyandangController.kegiatanpenyandang);

module.exports = router;