class FoodModel {
    constructor(record) {
        this.Id = record[3], //record.KALA,
            this.Name = record[4], //record.KALA_NAME,
            this.Price = record[8], //record.NERKH,
            this.Quantity = record[6], //record.MOJODI,
            this.Rate = record[7], //record.SH_APPROVAL,
            this.VAT = parseInt(record[10]) + parseInt(record[11]) //record.AFZOODE_PERCENT + record.AVAREZ_PERCENT// Value-Added Tax
    }
}

module.exports = FoodModel;