const express = require('express');
const port = 3000;
const app = express();

const path = require('path');
const router = require('./routes');

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false}));

require('./config/initHandlerbars')(app);

app.use(router);

app.listen(port, console.log.bind(console, `Server listening on port ${port}`));