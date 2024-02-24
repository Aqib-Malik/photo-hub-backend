// routes/routes.js
const express = require('express');
const router = express.Router();
const { signup, verifyEmail,login,updateIsPhotographer,getAllUsers } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.put('/users/:userId/is-photographer', updateIsPhotographer);
router.get('/users', getAllUsers);


module.exports = router;
