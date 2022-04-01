const expressHandlebars = require('express-handlebars');

function initHandlebars(app) {
    app.engine('hbs', expressHandlebars({ extname: 'hbs'}));
    app.set('view engine', 'hbs');
}

module.exports = initHandlebars;