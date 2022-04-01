const express = require('express');

const router = express.Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController.js');

router.use('', homeController);
router.use('', authController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.all('*', (req, res) => res.render('404', {
    isAuthenticated: req.isAuthenticated
}));

module.exports = router;