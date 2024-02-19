// routes/routes.js
const express = require('express');
const router = express.Router();
const { signup, verifyEmail,login,updateIsPhotographer } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.put('/users/:userId/is-photographer', updateIsPhotographer);


module.exports = router;
