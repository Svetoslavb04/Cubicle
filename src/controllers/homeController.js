const express = require('express');

const router = express.Router();

const cubeService = require('../services/cubeService.js');

router.get('/', (req, res) => {
    
    const text = req.query.search;
    const from = req.query.from;
    const to = req.query.to;
    
    cubeService.getSearched(text, from, to)
        .then(cubes => res.render('index', {
            isAuthenticated: req.isAuthenticated,
            cubes
    }));
});

router.get('/about', (req, res) => {
    res.render('about', {
        isAuthenticated: req.isAuthenticated,
    });
});

module.exports = router;