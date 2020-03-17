
const oracleDB = require('oracledb');
const dbConfig = require('../../../startup/dbConfig')();
const OrderModel = require('../../../Models/Order_model');
const moment = require('jalali-moment');
const mom = moment().locale('fa');


module.exports.order_list = (req, res) => {
    console.log(mom.format('YYYY/MM/DD'));    

    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute("SELECT * FROM  V_ANDROID_MONITORING_FACTOR WHERE DATE_PAGE = '1398/03/24' ")// + ` '${mom.format('YYYY/MM/DD')}' `)
                .then(result => {
                    if (result.rows.length === 0) {
                        // user not exists
                        res.status(200).send('No orders for today, yet!');
                    }

                    let output = [];
                    result.rows.map(rec => {
                        let obj = new OrderModel(rec);
                        output.push(obj);
                    });
                    res.send(JSON.stringify(output));
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => { console.log(err); res.status(500).send('Error Connecting to DB'); });
}


module.exports.order_detail = (req, res) => {
    res.status(200).send('details of the given order id');
}


module.exports.make_reserve = (req, res) => {
    res.status(200).send('going to make reservation');
}


module.exports.orders_me = (req, res) => {
    res.status(200).send('list orders taken by the given captainID');
}


module.exports.orders_by_guestMobile = (req, res) => {

    // use guestController --> fetch user info using mobile
    // now use huest tafsili and call order_list using that tafsili
    res.status(200).send('list orders made through the given guest mobile');
}