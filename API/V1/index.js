
const express = require('express');
const router = express.Router();
const config = require('config');
const FoodModel = require('../../Models/Food_model');
const oracleDB = require('oracledb');
var moment = require('jalali-moment');



// ------ Base Config
const mom = moment().locale('fa');
const dbConfig = {
    user: config.get('connectionStrings.oracle.user'),
    password: config.get('connectionStrings.oracle.password'),
    connectString: config.get('connectionStrings.oracle.db')
};




router.get('/test', (req, res) => {
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

router.get('/foods', (req, res) => {

    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute('select * from V_LAST_FOOD_STOCK where YEAR = ' + mom.format('YYYY'))
                .then(result => {
                    let output = [];
                    result.rows.map(rec => {
                        // console.log(rec);
                        let obj = new FoodModel(rec);
                        output.push(obj);
                    });
                    res.send(JSON.stringify(output));
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => { console.log(err); res.status(500).send('Error Connecting to DB'); });
});

router.get('/foods/:id', (req, res) => {
    res.status(200).send('details of the given food id');
});

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