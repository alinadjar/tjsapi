class GuestInfoModel {
    constructor(record) {
        this.Id = record[0],  //Tafsili
        this.Name = record[2],
        this.Mobile = record[1]
    }
}

module.exports = GuestInfoModel;