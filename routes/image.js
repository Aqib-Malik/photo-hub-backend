// routes/image.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/', imageController.createImage);
router.get('/', imageController.getImages);
router.post('/addratting', imageController.addRating);


router.get('/getcategories', imageController.getCategories);

module.exports = router;
