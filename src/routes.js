const express = require('express');

const router = express.Router();

const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');

router.use('', homeController);
router.use('/cubes', cubeController);
router.all('*', (req, res) => res.render('404'));

module.exports = router;