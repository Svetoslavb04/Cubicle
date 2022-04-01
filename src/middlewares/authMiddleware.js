const authService = require('../services/authService');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies['jwt'];

    if (token) {
        isAuth = authService.verifyJWT(token)
            .then(decoded => {
                req.isAuthenticated = true;

                next();
            })
            .catch(err => {
                req.isAuthenticated = false;

                next();
            });
    }
    else {
        req.isAuthenticated = false;

        next();
    }
}

const user = (req, res, next) => {
    const token = req.cookies['jwt'];
    
    if (token) {
        isAuth = authService.verifyJWT(token)
            .then(decoded => {
                req.user = decoded;

                next();
            })
            .catch(err => {
                req.user = {};
                next();
            });
    }
    else {
        req.user = {};

        next();
    }
}

module.exports = {
    isAuthenticated,
    user
}