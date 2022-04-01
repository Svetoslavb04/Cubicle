const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: [500, 'Description is too long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid URL']
    }
});

const Accessory = mongoose.model('Accessory', accessoriesSchema);

module.exports = Accessory;