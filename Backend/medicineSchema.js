const mongoose = require("mongoose")
const {Schema} = mongoose;

const medicine = Schema({
    "_id":Schema.Types.ObjectId,
    "Medicine Name":String,
    "Type of Sell":String,
    "Manufacturer":String,
    "Salt":String,
    "MRP":String,
    "Uses":String,
    "Side Effects":String,
    "Chemical Class":String,
    "Therapeutic Class":String,
    "Action Class":String,
})

const Medicine = mongoose.model("medicine",medicine);
module.exports = Medicine;