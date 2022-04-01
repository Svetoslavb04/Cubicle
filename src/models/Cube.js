const mongoose = require('mongoose');
const { Schema } = mongoose;

const cubesSchema = new mongoose.Schema({
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
    },
    difficulty:{
        type: Number,
        required: true,
        min: [1, 'Diffuculty cannot be less than 1'],
        max: [6, 'Difficulty cannot be more than 6']
    },
    _ownerId: {
        type: String,
        required: true
    },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }]
});

const Cube = mongoose.model('Cube', cubesSchema);

module.exports = Cube;