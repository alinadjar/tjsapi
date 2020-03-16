
const CEREMONY_HALL = require('../../../Models/CEREMONY_HALL');
const oracleDB = require('oracledb');
const dbConfig = require('../../../startup/dbConfig')();

module.exports.saloon_list = (req, res) => {
    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute('select * from V_CEREMONY_HALL')
                .then(result => {
                    let output = [];
                    result.rows.map(rec => {
                        console.log(rec);
                        let obj = new CEREMONY_HALL(rec);
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