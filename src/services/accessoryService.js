const Accessory = require('../models/Accessory.js');
const Cube = require('../models/Cube.js');

const create = (name, description, imageUrl) => Accessory.create({ name, description, imageUrl });

const getAvailabeAccessoriesForCube = async (cubeId) => {

    let attachedIds = await Cube.findById(cubeId)
    .then(cube => cube.accessories)
    
    let available = await Accessory.find({ _id: { $nin: attachedIds } }).lean();

    return available;
}

    module.exports = {
    create,
    getAvailabeAccessoriesForCube
}