// importing my modules
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mysql = require('mysql');


//initializing Express
const app = express();

//Static File Path
app.use(express.static('public'));

const keys = require('./config/keys');
const connection = mysql.createConnection(keys.dbOptions);
// const sessionStore = new mySqlStore({}, connection);

//Seting up the Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.handlebars', expressHbs({
    defaultLayout: 'layouts',
    extname: '.handlebars',
    // handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('home')
});

//Setting up the routes
const pollsRoute = require('./routes/lga');
const lgaRoute = require('./routes/polls');
const scoreRoute = require('./routes/store');


app.use(pollsRoute);
app.use(lgaRoute);
app.use(scoreRoute);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(Math.random());
});