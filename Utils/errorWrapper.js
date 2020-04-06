//---------------------------------------------------

//  If you throw an error asynchronously, you'll just crash the server:
// const app = require('express')();
// app.get('*', function(req, res, next) {
//     // Will crash the server on every HTTP request
//     setImmediate(() => { throw new Error('woops'); });
//   });
  
//   app.use(function(error, req, res, next) {
//     // Won't get here, because Express doesn't catch the above error
//     res.json({ message: error.message });
//   });

 

// app.get('*', function(req, res, next) {
//   // Reporting async errors *must* go through `next()`
//   setImmediate(() => { next(new Error('woops')); });
// });

// app.use(function(error, req, res, next) {
//   // Will get here
//   res.json({ message: error.message });
// });

const app = require('express')();

app.get('*', wrapAsync(async function(req, res) {
  await new Promise(resolve => setTimeout(() => resolve(), 50));
  // Async error!
  throw new Error('woops');
}));

app.use(function(error, req, res, next) {
  // Gets called because of `wrapAsync()`
  res.json({ message: error.message });
});

app.listen(3000);

function wrapAsync(fn) {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}


