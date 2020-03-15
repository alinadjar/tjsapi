var moment = require('jalali-moment');
const m = moment().locale('fa');
console.log(m.format('YYYY/M/D'));
console.log(m.format('YYYY')); // 1398