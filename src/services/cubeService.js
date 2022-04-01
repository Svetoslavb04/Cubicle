const Cube = require('../models/Cube.js');

const util = require('util');

const create = (name, description, difficulty, img, _ownerId) => Cube.create({ name, description, imageUrl: img, difficulty, _ownerId });

const edit = (cube_id, name, description, difficulty, img) =>
    Cube.findByIdAndUpdate(cube_id, { name, description, imageUrl: img, difficulty }, {
        runValidators: true
    }, function (err, cube) {
        if (err) {
            return { message: err.message };
        }
        else {
            return { cube };
        }
    });

const deleteCube = (id) => Cube.findByIdAndDelete(id, function (err, cube) {
    if (err) {
        return { message: err.message }
    } else {
        return { cube }
    }
});

const attachAccesory = (cubeId, accessoryId) => Cube.findById(cubeId)
    .then(cube => {
        cube.accessories.push(accessoryId);
        cube.save();
    });

const getAll = () => Cube.find({}).lean();

const getCube = (id) => Cube.findById(id).populate('accessories').lean();

const getSearched = (text, from, to) => {
    let searchedOptions = {};

    if (text) {
        searchedOptions.name = { $regex: new RegExp(`.*${text}.*`, 'i') };
    }
    if (from || to) {
        searchedOptions.difficulty = {};
    }
    if (from) {
        searchedOptions.difficulty.$gte = Number(from);
    }

    if (to) {
        searchedOptions.difficulty.$lte = Number(to);
    }

    return Cube.find(searchedOptions).lean();
}

module.exports = {
    create,
    edit,
    deleteCube,
    attachAccesory,
    getAll,
    getCube,
    getSearched
}