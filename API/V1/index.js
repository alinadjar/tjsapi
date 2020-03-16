
const serviceSMS = require('../../services/serviceSMS');
const express = require('express');
const router = express.Router();


// -------------------------- Controllers
const foodController = require('./Controllers/foodController');
const userController = require('./Controllers/userController');
const saloonController = require('./Controllers/saloonController');








router.get('/test/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send('test v1 success');
});


// router.get('/users', userController.user_list);
// router.get('/users/:username', userController.user_detail);
router.post('/signin', userController.user_signin);
router.get('/users/me', userController.user_me);
router.get('/users/token', userController.user_renewToken);
router.post('/token/reject', userController.user_rejectToken)


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

router.get('/guests/:id', (req, res) => {
    res.status(200).send('list of guests info');
});

router.get('/guests/:mobile/info', (req, res) => {
    res.status(200).send('details of the given guest');
});



router.get('/saloons', saloonController.saloon_list);

router.post('sendSMS', async (req, res) => {
    
    // validate req.body

    let result = await serviceSMS.sendSMS(req.body.mobile, req.body.message);
    if(result === -1) {
        res.status(500).send('message not sent');
    }
    res.status(200).send('message sent');
});




module.exports = router;