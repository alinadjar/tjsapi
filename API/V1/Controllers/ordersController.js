
const oracleDB = require('oracledb');
const dbConfig = require('../../../startup/dbConfig')();
const OrderModel = require('../../../Models/Order_model');
const OrderDetailModel = require('../../../Models/OrderDetail_model');
const GuestInfoModel = require('../../../Models/Guest_Info_model');
const { MyErrorHandler } = require('../../../Utils/error');
const moment = require('jalali-moment');
const mom = moment().locale('fa');


module.exports.order_list = (req, res, next) => {
    console.log(mom.format('YYYY/MM/DD'));

    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute("SELECT * FROM  V_ANDROID_MONITORING_FACTOR WHERE DATE_PAGE = '1398/03/24' and CENTER = 24")// + ` '${mom.format('YYYY/MM/DD')}' `)
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


module.exports.order_detail = async (req, res, next) => {
    console.log(req.params.visualFactorID);

    if (req.params.visualFactorID === 'me') {
        return this.orders_me(req, res, next);
        // this.orders_me(req, res, next);
        // return; 
    }

    let connection;
    try {

        // let query1 = "SELECT * \
        //              FROM  V_ANDROID_MONITORING_FACTOR \
        //              WHERE DATE_PAGE = "+`' ${mom.format('YYYY/MM/DD')}'`+" and SHO_PAGE = "+req.params.visualFactorID+" and CENTER = 24";
        let query1 = "SELECT ID_H \
                     FROM  V_ANDROID_MONITORING_FACTOR \
                     WHERE DATE_PAGE = "+ `'1398/03/24'` + " and SHO_PAGE = " + req.params.visualFactorID + " and CENTER = 24";
        console.log(query1);
        let query2 = 'select * from V_RESTURANT_PRINT where hsao01 = :id';


        connection = await oracleDB.getConnection(dbConfig);

        const result = await connection.execute(query1);
        if (result.rows.length === 0) {
            // order not exists
            res.status(404).send('No such order exists');
        }

        console.log(result.rows[0]);
        const Factor_ID = result.rows[0][0];

        const resultDetail = await connection.execute(query2, { id: Factor_ID });
        let output = [];
        resultDetail.rows.map(rec => {
            // console.log(rec);
            let obj = new OrderDetailModel(rec);
            output.push(obj);
        });

        res.status(200).send(JSON.stringify(output));

    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        }
    }
}


module.exports.order_print = async (req, res, next) => {
    console.log(req.params.id);
    const Factor_ID = req.params.id;

    let connection;
    try {

        let queryHeader = "SELECT * FROM  V_ANDROID_MONITORING_FACTOR WHERE DATE_PAGE = '1398/03/24' and CENTER = 24 and ID_H = :id "// + ` '${mom.format('YYYY/MM/DD')}' `
        let queryDetail = 'select * from V_RESTURANT_PRINT where hsao01 = :id';


        connection = await oracleDB.getConnection(dbConfig);

        const result = await connection.execute(queryHeader, { id: Factor_ID });
        if (result.rows.length === 0) {
            // order not exists
            res.status(404).send('No such order exists');
        }


        const output = {
            Header: new OrderModel(result.rows[0]),
            Detail: []
        }


        const resultDetail = await connection.execute(queryDetail, { id: Factor_ID });
        resultDetail.rows.map(rec => {
            let obj = new OrderDetailModel(rec);
            output.Detail.push(obj);
        });

        res.status(200).send(JSON.stringify(output));

    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        }
    }
}


module.exports.make_reserve = (req, res, next) => {
    res.status(200).send('going to make reservation');
}


module.exports.orders_me = (req, res, next) => {
    console.log(req.user);

    const { username } = req.user;


    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute("SELECT * FROM  V_ANDROID_MONITORING_FACTOR WHERE DATE_PAGE = '1398/03/24' \
             and CENTER = 24 and MODIFY_USERID = " + `'${username}'`)// + ` '${mom.format('YYYY/MM/DD')}' `)
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
                    res.send(output);
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => { console.log(err); res.status(500).send('Error Connecting to DB'); });
    // res.status(200).send('list orders taken by the given captainID');
}


module.exports.orders_by_guestMobile = async (req, res, next) => {

    let connection;
    try {
        connection = await oracleDB.getConnection(dbConfig);

        const r = await connection.execute(
            "select * from V_LIST_RESTURANT_CUSTOMER where INCU12 = " + ` '${req.params.mobileNumber}' `);

        if (r.rows.length === 0) {
            throw new MyErrorHandler(404, 'No such guest exists')
        }

        guest = new GuestInfoModel(r.rows[0]);
        console.log(guest);

        // guest.Id  is  Tafsili        
        const query = "SELECT * FROM  V_ANDROID_MONITORING_FACTOR \
                       WHERE DATE_PAGE = '1398/03/24' and CENTER = 24 and TAF=:customerTAF";// ` '${mom.format('YYYY/MM/DD')}' `
        const customerOrdersList = await connection.execute(query, { customerTAF: guest.Id });


        let output = [];
        customerOrdersList.rows.map(rec => {
            let obj = new OrderModel(rec);
            output.push(obj);
        });

        res.status(200).send(output);

    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        }
    }

    // use guestController --> fetch user info using mobile
    // now use guest tafsili and call order_list using that tafsili
    // res.status(200).send('list orders made through the given guest mobile');
}