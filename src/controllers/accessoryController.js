const express = require('express');

const router = express.Router();

const accessoryService = require('../services/accessoryService.js');

router.get('/create', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    res.render('accessory/create', {
        isAuthenticated: req.isAuthenticated,
    });
});

router.post('/create', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    accessoryService.create(name, description, imageUrl)
        .then(() => res.redirect('/'));
})

module.exports = router;