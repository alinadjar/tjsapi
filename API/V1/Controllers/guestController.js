const { MyErrorHandler } = require('../../../Utils/error');
const GuestInfoModel = require('../../../Models/Guest_Info_model');
const oracleDB = require('oracledb');
const dbConfig = require('../../../startup/dbConfig')();

module.exports.guest_list = (req, res, next) => {
    res.status(200).send('list of guests info');
}


module.exports.guest_detail_by_ID = (req, res, next) => {
    console.log(req.params.id);
    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute('select * from V_LIST_RESTURANT_CUSTOMER where INCU01 = ' + req.params.id)
                .then(result => {
                    if (result.rows.length === 0) {
                        // user not exists
                        // res.status(404).send('No such guest exists');
                        throw new MyErrorHandler(404, 'No such guest exists')
                    }

                    console.log(result.rows[0]);

                    let guest = null;
                    guest = new GuestInfoModel(result.rows[0]);

                    res.send(JSON.stringify(guest));
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => { 
            console.log(err); 
            //res.status(500).send('Error Connecting to DB'); 
            next(new MyErrorHandler(500, 'Error Connecting to DB'));
        });
}



module.exports.guest_detail_by_mobile = (req, res, next) => {

    console.log(req.params.mobileNumber);
    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute("select * from V_LIST_RESTURANT_CUSTOMER where INCU12 = " + ` '${req.params.mobileNumber}' `)
                .then(result => {
                    if (result.rows.length === 0) {
                        // user not exists
                        // res.status(400).send('No such guest exists');
                        throw new MyErrorHandler(404, 'No such guest exists')
                    }

                    console.log(result.rows[0]);
                    let guest = null;
                    guest = new GuestInfoModel(result.rows[0]);
                    console.log(guest);

                    res.send(JSON.stringify(guest));
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => { 
            console.log(err); 
            // res.status(500).send('Error Connecting to DB'); 
            next(new MyErrorHandler(500, 'Error Connecting to DB'));
        });

}


module.exports.guest_create = async (req, res, next) => {

    let connection;
    try {

        // validate(req.body);

        let guest = new GuestInfoModel(['', req.body.mobile, req.body.name]);
        console.log(guest);

        const query = `BEGIN SP_RESTURANT_LOGIN(
            :Sho_Mobile,
            :Name_Client,        
            :Result_
        ); END;`;

        connection = await oracledb.getConnection(dbConfig);

        const resultSP = await connection.execute(query,
            {
                Sho_Mobile: { val: guest.Mobile, type: oracledb.STRING, dir: oracledb.BIND_IN },
                Name_Client: { val: guest.Name, type: oracledb.STRING, dir: oracledb.BIND_IN },
                Result_: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            }, { autoCommit: true });

        console.log(resultSP);
        console.log(json.stringify(resultSP));
        console.log('============================');
        console.log(resultSP.outBinds);
        if (_.toString(resultSP.value) === '-1') {
            // res.status(500).send('Transaction Failed: , Please try again');
            throw new MyErrorHandler(500, 'Transaction Failed: , Please try again')
        }


        res.status(200).send({
            tafsili: resultSP // .Result_
        });


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
