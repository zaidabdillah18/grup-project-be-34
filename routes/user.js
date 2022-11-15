const express = require('express');
const router = express.Router();
//ini menuju ke controller
const userController = require('../controllers/user.controller');
//registrasi
router.post("/signup", userController.signUp);
//login
router.post("/login", userController.login)

module.exports = router;