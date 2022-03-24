const express = require('express');

const router = express.Router();

const cubeService = require('../services/cubeService.js');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const difficulty = req.body.difficultyLevel;
    const img = req.body.imageUrl;

    cubeService.create(name, description, difficulty, img);

    res.redirect('/');
})

router.get('/details/:id', (req, res) => {
    res.render('details', {
        cube: cubeService.getCube(req.params.id)
    });
});

module.exports = router;