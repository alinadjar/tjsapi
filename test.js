// var moment = require('jalali-moment');
// const m = moment().locale('fa');
// console.log(m.format('YYYY/M/D'));
// console.log(m.format('YYYY')); // 1398


// var uid = require('rand-token').uid;
// var token = uid(16);
// console.log(uid(16));
// console.log(uid(32));


const jwt = require('jsonwebtoken');
const config = require('config');
const token = jwt.sign({
    data: 'foobar'    
}, config.get('jwtSECRET'), { expiresIn: 300 });

  console.log(token);