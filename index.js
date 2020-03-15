const express = require('express');
const app = express();


// ----------------------------  Basic Config
const PORT = process.env.PORT || 2000;
const NODE_ENV = process.env.NODE_ENV || 'development';
// app.set('port', PORT);
// console.log(app.get('port'));


// ----------------------------  Middlewares

// ---------------------------- Route Handlers
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

// ----------------------------  Error Handlers

const server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('API running at http://%s:%s', host, port);
});