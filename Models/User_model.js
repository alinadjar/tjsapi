class UserModel {
    constructor(record) {
            this.fullName = record[0], //record.FULLNAME,
            this.loginName = record[1], //record.USERNAME,
            this.password = record[2], //record.PASSWORD,
            this.enable = record[3] //record.ENABLE,            
    }
}

module.exports = UserModel;