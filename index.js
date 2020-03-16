const express = require('express');
const app = express();
const morgan = require('morgan');


// ----------------------------  Basic Config
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
// app.set('port', PORT);
// console.log(app.get('port'));




// ----------------------------  Middlewares

//--- CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//--- json parse the request body
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', require('./API'));




// ---------------------------- Route Handlers
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

// ----------------------------  Error Handler Middleware


const server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('API running at http://%s:%s', host, port);
});