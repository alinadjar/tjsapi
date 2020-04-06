class MyErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = {
    MyErrorHandler
}

//----------------------------------
// here is an example route handler body:
// try {
//     const { email, password } = req.body
//     if (!email || !password) {
//         throw new ErrorHandler(404, 'Missing required email and password fields')
//     }
//     const user = await db.User.findOne({ where: { email } });
//     if (!user) {
//         throw new MyErrorHandler(404, 'User with the specified email does not exists')
//     }
//     next()
// } catch (error) {
//     next(error)
// }


//-----------------------
// then, inside the errorMiddleware you'll have:
// const { statusCode, message } = err;
// res.status(statusCode).json({
//     status: "error",
//     statusCode,
//     message
// });