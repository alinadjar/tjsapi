
const express = require('express');
const router = express.Router();


// -------------------------- Controllers
const foodController = require('./Controllers/foodController');









router.get('/test/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send('test v1 success');
});


// router.get('/users', (req, res) => {
//     res.status(200).send('list of captain orders');
// });

// router.get('/users/:username', (req, res) => {
//     res.status(200).send('details of the given id');
// });

router.post('/signin', (req, res) => {
    // authenticate user,
    // generate JWT token
    res.sendStatus(200);
});

router.get('/foods', foodController.food_list);

router.get('/foods/:id', foodController.food_detail);

router.get('/orders', (req, res) => {
    res.status(200).send('list of orders');
});

router.get('/orders/:id', (req, res) => {
    res.status(200).send('details of the given order id');
});


router.post('/orders', (req, res) => {
    res.status(200).send('going to make reservation');
});

router.get('/myOrders/:captainID', (req, res) => {
    res.status(200).send('list orders taken by the given captainID');
});


// router.get('/guests', (req, res) => {
//     res.status(200).send('list of guests info');
// });

router.get('/guests/:mobile', (req, res) => {
    res.status(200).send('details of the given guest');
});



router.post('sendSMS', (req, res) => {
    // protect this route through static encypted key (bcryptjs)
    res.status(200).send('send message');
});




module.exports = router;