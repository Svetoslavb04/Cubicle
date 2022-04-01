const express = require('express');

const router = express.Router();

const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');

router.get('/create', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }
    console.log(req.isAuthenticated);
    res.render('cube/create', {
        isAuthenticated: req.isAuthenticated,
    });
})

router.post('/create', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    const name = req.body.name;
    const description = req.body.description;
    const difficulty = req.body.difficultyLevel;
    const img = req.body.imageUrl;

    cubeService.create(name, description, difficulty, img, req.user._id)
        .then(() => res.redirect('/'))
        .catch(err => res.redirect('/404'));
})

router.get('/:id/edit', (req, res) => {
    if (!req.isAuthenticated) { return res.redirect('/') }

    cubeService.getCube(req.params.id)
        .then(cube => {
            if (cube._ownerId != req.user._id) {
                return res.redirect('/');
            }

            res.render('cube/edit', {
                cube,
                isAuthenticated: req.isAuthenticated
            })
        });
})

router.post('/:id/edit', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    const cube_id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const difficulty = req.body.difficultyLevel;
    const img = req.body.imageUrl;

    cubeService.getCube(req.params.id)
        .then(cube => {
            if (cube._ownerId != req.user._id) {
                return res.redirect('/');
            }

            const response = cubeService.edit(cube_id, name, description, difficulty, img);

            if (response.message) {
                res.send(response.message);
            }
            else {
                res.redirect(`/`);
            }
        });
})

router.get('/:id/delete', (req, res) => {
    if (!req.isAuthenticated) { return res.redirect('/') }

    cubeService.getCube(req.params.id)
        .then(cube => {
            if (cube._ownerId != req.user._id) {
                return res.redirect('/');
            }

            res.render('cube/delete', {
                cube,
                isAuthenticated: req.isAuthenticated
            })
        });
});

router.post('/:id/delete', (req, res) => {
    if (!req.isAuthenticated) { return res.redirect('/') }

    cubeService.getCube(req.params.id)
        .then(cube => {
            if (cube._ownerId != req.user._id) {
                return res.redirect('/');
            }

            const response = cubeService.deleteCube(req.params.id);

            if (response.message) {
                res.send(response.message);
            }
            else {
                res.redirect(`/`);
            }
        });
})

router.get('/details/:id', (req, res) => {

    cubeService.getCube(req.params.id)
        .then(cube => {
            let isOwner = false;

            if (cube._ownerId == req.user._id) {
                isOwner = true;
            }

            res.render('cube/details', {
                isAuthenticated: req.isAuthenticated,
                isOwner,
                cube
            })
        });
});

router.get('/details/:id/attachAccessory', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    Promise.all([cubeService.getCube(req.params.id), accessoryService.getAvailabeAccessoriesForCube(req.params.id)])
        .then((values) => {
            res.render('cube/attachAccessory', {
                isAuthenticated: req.isAuthenticated,
                cube: values[0],
                accessories: values[1]
            });
        })
});

router.post('/details/:id/attachAccessory', (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    cubeService.attachAccesory(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/cubes/details/${req.params.id}`));
})

module.exports = router;