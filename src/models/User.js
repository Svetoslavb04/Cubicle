const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [2, 'Username cannot be less than 2 sybmols long!']
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [2, 'Password cannot be less than 2 sybmols long!']
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 9)
        .then(hash => {
            this.password = hash;

            next();
        });
})

const User = mongoose.model('User', userSchema);

module.exports = User;