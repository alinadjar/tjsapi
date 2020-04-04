
const serviceSMS = require('../../services/serviceSMS');
const authMiddleware = require('../../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();


// -------------------------- Controllers
const foodController = require('./Controllers/foodController');
const userController = require('./Controllers/userController');
const saloonController = require('./Controllers/saloonController');
const orderController = require('./Controllers/ordersController');
const guestController = require('./Controllers/guestController');







router.get('/test/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send('test v1 success');
});


// router.get('/users', userController.user_list);
// router.get('/users/:username', userController.user_detail);
router.post('/signin', userController.user_signin);
router.get('/users/me', userController.user_me);
router.get('/users/token', userController.user_renewToken);
router.post('/token/reject', userController.user_rejectToken);


router.get('/foods', authMiddleware, foodController.food_list);
router.get('/foods/:id', foodController.food_detail);


router.get('/orders', orderController.order_list);
router.get('/orders/:visualFactorID', authMiddleware, orderController.order_detail);
router.get('/orders/:id/print', orderController.order_print);
router.post('/orders', orderController.make_reserve);
// router.get('/myOrders/:captainID', orderController.orders_me); equivalent to the next resource
router.get('/orders/me', authMiddleware, orderController.orders_me);
router.get('/orders/mobile/:mobileNumber', orderController.orders_by_guestMobile);



// router.get('/guests', guestController.guest_list);
router.get('/guests/:id', guestController.guest_detail_by_ID);
router.get('/guests/mobile/:mobileNumber/info', guestController.guest_detail_by_mobile);
router.post('/guests', guestController.guest_create);




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