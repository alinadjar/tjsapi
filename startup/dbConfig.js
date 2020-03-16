const config = require('config');

module.exports = () => {
    return {
        user: config.get('connectionStrings.oracle.user'),
        password: config.get('connectionStrings.oracle.password'),
        connectString: config.get('connectionStrings.oracle.db')
    };
}