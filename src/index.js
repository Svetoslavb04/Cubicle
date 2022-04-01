const express = require('express');
const port = 3000;
const app = express();

const path = require('path');
const router = require('./routes');
const connectDb = require('./config/initDatabase');
const cookieParser = require('cookie-parser');
 
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false}));

const authMiddleware = require('./middlewares/authMiddleware');
app.use(authMiddleware.user);
app.use(authMiddleware.isAuthenticated);

require('./config/initHandlerbars')(app);

app.use(router);

connectDb()
    .then(() => app.listen(port, console.log.bind(console, `Server listening on port ${port}`)))
    .catch(err => console.log(err.message));
