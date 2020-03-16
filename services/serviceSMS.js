const axios = require('axios');
const config = require('config');
// const _ = require('lodash');

module.exports.sendSMS = async (mobileNumber, message) => {

	let response;

	try {
		response = await axios.post(config.get('sms.endpoint'), {
			"username": config.get('sms.username'),
			"password": config.get('sms.password'),
			"mobile": mobileNumber,//_.toString(mobileNumber),
			"message": message,
			"line": config.get('sms.lineNumber'),
			"type": 0,
			"template": 0
		});

		
        console.log(response.status);
        console.log(response.msg);
		return response.status;
	} catch (ex) {    
		return -1;
	}
}

// module.exports.sendMultiSMS = () => {

// }