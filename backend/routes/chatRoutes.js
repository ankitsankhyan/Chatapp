const express = require('express');

const {protect} = require('../middleware/authMiddleware');
const {accessChat} = require('../controller/userController');
const router = express.Router();


router.route("/").post(protect, accessChat);

module.exports = router;