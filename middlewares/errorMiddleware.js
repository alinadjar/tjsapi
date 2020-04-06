module.exports = (err, req, res, next) => {

    res.set('Content-Type', 'application/json');
    // res.status(500).send(JSON.stringify({
    //     // status: 500,
    //     message: "error in Catch Block",
    //     detailedMessage: err.message
    // }));

    console.log('inside errorMiddleware: ' + err);


    const { statusCode, message } = err;
    if (!statusCode) {
        res.status(500).send(err.message);
    } else {
        res.status(statusCode).json({
            status: "error",
            statusCode,
            message
        });
    }

}