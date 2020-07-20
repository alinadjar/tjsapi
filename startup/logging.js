
module.exports = () => {

    process.on('uncaughtException', ex => {
        console.log(ex);
        console.log('UNCAUGHT EXCEPTION OCCURED....');
        process.exit(1);
    });

    process.on('unhandledRejection', ex => {
        console.log(ex);
        console.log('UNHANDLED REJECTION OCCURED....');
        process.exit(1);
    });


}