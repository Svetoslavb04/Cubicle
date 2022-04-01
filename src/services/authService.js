const User = require('../models/User.js');

const constants = require('../config/constants');
const util = require('util');

const jwt = require('jsonwebtoken');
const jwtSign = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);

const bcrypt = require('bcrypt');

const register = (username, password, rePass) => {
    if (password != rePass) {
        return { message: 'Passwords does not match!' }
    }
    console.log(username);
    return User.create({ username, password })
        .then(user => {
            return { user };
        })
        .catch(err => { return { message: err.message } })
}

const login = (username, password) => {
    return User.findOne({ username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isSame => {
                        if (isSame) {
                            return { user }
                        }
                        else {
                            throw { message: 'Username or password does not match!'}
                        }
                    })

                return { user };
            }
            throw { message: 'Cannot find username or password!'}
        })
        .catch(err => { return { message: err.message } })
}

const logout = (res) => {
    res.clearCookie('jwt');
}

const signJWT = (user) => {
    return jwtSign(user, constants.SECRET);
}

const verifyJWT = (token) => {
    return jwtVerify(token, constants.SECRET);
}

module.exports = {
    register,
    login,
    logout,
    signJWT,
    verifyJWT
}