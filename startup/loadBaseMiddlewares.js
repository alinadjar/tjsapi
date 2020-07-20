
const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');


module.exports = (app) => {
    //--- CORS
    // app.use(cors());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //--- json parse the request body
    app.use(express.json());
    app.use(morgan('tiny'));
}