const config = require('config');
const FoodModel = require('../../../Models/Food_model');
const oracleDB = require('oracledb');
var moment = require('jalali-moment');


// ------ Base Config
const mom = moment().locale('fa');

const dbConfig = require('../../../startup/dbConfig')();



// display list of all foods
module.exports.food_list = (req, res, next) => {

    oracleDB.getConnection(dbConfig)
        .then(connection => {
            //connection.execute('select * from V_LAST_FOOD_STOCK where YEAR = ' + mom.format('YYYY'))
            connection.execute('select * from V_LAST_FOOD_STOCK where YEAR = ' + '1398')
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
        .catch((err) => { 
            // console.log(err); res.status(500).send('Error Connecting to DB');
            next(err);
         });
}


// display details of the given food
module.exports.food_detail = (req, res) => {
    // console.log(req.params.id);
    // this.food_list
    oracleDB.getConnection(dbConfig)
        .then(connection => {
            //connection.execute('select * from V_LAST_FOOD_STOCK where YEAR = ' + mom.format('YYYY') + 'and KALA =' + req.params.id)
            connection.execute('select * from V_LAST_FOOD_STOCK where YEAR = ' + '1398' + 'and KALA =' + req.params.id)
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
}