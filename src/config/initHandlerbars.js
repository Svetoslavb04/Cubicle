const handlebars = require('express-handlebars');

function initHandlebars(app) {
    app.engine('hbs', handlebars({ extname: 'hbs'}));
    app.set('view engine', 'hbs');
}

module.exports = initHandlebars;