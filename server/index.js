require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session');


const {SERVER_PORT, SESSION_SECRET} = process.env; 

//MiddleWare
const mid = require('./middlewares/checkForSession.js');

//Controllers
const swag = require('./controllers/swag_controller');
const auth = require('./controllers/auth_controller');


const app = express();


app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(mid);

//swag
app.get('/api/swag', swag.read);

//auth
app.post( '/api/login', auth.login );
app.post( '/api/register', auth.register );
app.post( '/api/signout', auth.signout );
app.get( '/api/user', auth.getUser );





//serverport
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})
