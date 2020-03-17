class OrderModel {
    constructor(record) {
        this.Taf = record[7],
            this.TafName = record[8],
            this.TableNumber = record[9],
            this.SaloonCode = record[10],
            this.SaloonName = record[11],
            this.TimeCreate = record[12],
            this.TimePrint = record[19],
            this.TimeCooking = record[20],
            this.TimeReady = record[21],
            this.garsonID = record[31], // U_247 for cash-registrar
            this.CHK_Reg = record[14],
            this.CHK_Confirm = record[15],
            this.CNT_Print = record[16],
            this.state_print = record[17],
            this.state_order = record[18]
    }

}

module.exports = OrderModel;