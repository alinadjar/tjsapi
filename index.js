const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');


// ----------------------------  Basic Config
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
// app.set('port', PORT);
// console.log(app.get('port'));
require('./startup/logging')();


// ----------------------------  Middlewares
require('./startup/loadBaseMiddlewares')(app);



// ---------------------------- Routes
app.use('/api', require('./API'));




// ---------------------------- Route Handlers
app.get('/', (req, res) => {
    // throw new Error('woops');
    res.status(200).send('OK');
});

// ----------------------------  Error Handler Middleware
app.use(errorMiddleware);



const server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('API running at http://%s:%s', host, port);
});


