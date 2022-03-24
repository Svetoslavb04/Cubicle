const express = require('express');

const router = express.Router();

const cubeService = require('../services/cubeService.js');

router.get('/', (req, res) => {

    const text = req.query.search;
    const from = req.query.from;
    const to = req.query.to;
    
    res.render('index', {
        cubes: cubes = cubeService.getSearched(text, from, to)
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;