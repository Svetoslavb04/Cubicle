const uniqid = require('uniqid');

const cubes = [ {
    name: "Gan356 Air SM",
    description: 'lordasdaskdskdkask',
    difficulty: 3,
    img: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
    id: '5c39f1851ab3b24f5c03e182'
}];

const create = (name, description, difficulty, img) => cubes.push({name, description, difficulty, img, id: uniqid()});

const getAll = () => cubes.slice();

const getCube = (id) => cubes.find(c => c.id == id);

const getSearched = (text, from , to) => {
    let cars = getAll();

    if (text) {
        cars = cars.filter(c => c.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (from) {
        cars = cars.filter(c => c.difficulty >= from);
    }

    if (to) {
        cars = cars.filter(c => c.difficulty <= to);
    }

    return cars;
}

module.exports = {
    create,
    getAll,
    getCube,
    getSearched
}