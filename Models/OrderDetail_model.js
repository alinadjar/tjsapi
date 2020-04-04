class OrderDetailModel {
    constructor(record) {
        this.UserID = record[11], // cpatainOrder ID or Cache-Registrar userId
        this.KalaCode = record[13], // Food Code
        this.KalaName = record[14],
        this.Tedad = record[16],
        this.Nerkh = record[17],
        this.CustomerID = record[6],
        this.CustomerName = record[12],
        this.SaloonCode = record[9],
        this.DeskNumber = record[7],
        this.Time_OrderRegister = record[8]       
    }
}

module.exports = OrderDetailModel;