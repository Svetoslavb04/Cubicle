const router = require('express').Router();

const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        isAuthenticated: req.isAuthenticated,
    });
});

router.post('/login', async (req, res) => {
    const response = await authService.login(req.body.username, req.body.password);

    if (response.user) {
        const token = await authService.signJWT({ _id: response.user._id, username: response.user.username });

        res.cookie('jwt', token);

        res.redirect('/');
    }
    else {
        res.send(response.message);
    }
})

router.get('/logout', async (req, res) => {

    if (!req.isAuthenticated) { return res.redirect('/') }

    authService.logout(res);

    res.redirect('/login');
})

router.get('/register', (req, res) => {
    res.render('auth/register', {
        isAuthenticated: req.isAuthenticated,
    });
});

router.post('/register', async (req, res) => {
    const response = await authService.register(req.body.username, req.body.password, req.body.repeatPassword);

    console.log(response);

    if (response.user) {

        res.redirect('/');
    }
    else {
        res.send(response.message);
    }
});

module.exports = router;

