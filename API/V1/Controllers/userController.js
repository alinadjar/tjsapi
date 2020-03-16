const oracleDB = require('oracledb');
const config = require('config');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const dbConfig = require('../../../startup/dbConfig')();
const UserModel = require('../../../Models/User_model');

var refreshTokens = {}
const jwtSECRET = config.get('jwtSECRET');

module.exports.user_list = (req, res) => {
    res.status(200).send('list of captain orders');
}

module.exports.user_detail = (req, res) => {
    console.log(req.params.username);
    res.status(200).send('details of the given id');
}

module.exports.user_signin = (req, res) => {

    console.log(req.body);
    oracleDB.getConnection(dbConfig)
        .then(connection => {
            connection.execute('select * from android_user where USERNAME = ' + req.body.username)
                .then(result => {
                    if (result.rows.length === 0) {
                        // user not exists
                        res.status(400).send('Invalid User/Pass');
                    }

                    let user = null;
                    user = new UserModel(result.rows[0]);

                    // console.log('==obj==> ' + JSON.stringify(user));
                    if (!user || user.password !== req.body.password) {
                        res.status(400).send('Invalid User/Pass');
                    }
                    else {
                        // res.send(JSON.stringify(user));
                        var tokenBody = {
                            'username': user.loginName,
                            'enable': user.enable
                            // 'role': 'admin'
                        }                        
                        var token = jwt.sign(tokenBody, config.get('jwtSECRET'), { expiresIn: 300 }); // expire in 5 minutes
                        //   exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        // is equivalent to { expiresIn: '1h' }
                        var refreshToken = randtoken.uid(256);
                        refreshTokens[refreshToken] = user.loginName;                        

                        res.json({ token: 'JWT ' + token, refreshToken: refreshToken })
                    }
                })
                .catch((err) => {
                    console.log('Error, inside catch now!!!');
                    next(err);
                });
        })
        .catch((err) => { console.log(err); res.status(500).send('Error Connecting to DB'); });
}

module.exports.user_me = (req, res) => {
    res.sendStatus(200);
}


module.exports.user_renewToken = (req, res) => {
    const username = req.body.username;
    const refreshToken = req.body.refreshToken;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === username)) {

        var tokenBody = {
            'username': username,
            'enable': '1'
            // 'role': 'admin'
        }
        var token = jwt.sign(tokenBody, jwtSECRET, { expiresIn: 300 });
        res.json({ token: 'JWT ' + token });
    }
    else {
        res.sendStatus(401);
    }
}

// In an application in which a user can be working from different devices, 
// with a single identity (same username) but with different tokens on each device, 
// if one of these is lost or stolen, this method would allow the administrator to delete or disable
// the refresh token in question without the user being left without service on the other devices. 

//  In this case we simply deleted it from our list in memory. 
// In a complete implementation it would be necessary to verify that 
//the user who makes the request is an administrator or has the permissions for this resource.
module.exports.user_rejectToken = function (req, res, next) {
    var refreshToken = req.body.refreshToken
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken]
    }
    res.send(204)
}