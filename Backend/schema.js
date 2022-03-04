const mongoose = require('mongoose');
const {Schema} = mongoose;

const admitSchema = Schema({
    fname: String,
    lname: String,
    roomNo: Number,
    bedNo: Number,
    address: String,
    state: String,
    city: String,
    pincode: Number,
    phone: Number,
    email: String,
    sex: String,
    maritalStatus: String,
    occupancy:{
        type: Boolean,
        defaule: false
    }
});

// another way

// const admitSchema = {
//     fname: String,
//     lname: String,
//     address: String,
//     state: String,
//     city: String,
//     pincode: Number,
//     phone: Number,
//     email: String,
//     sex: String,
//     maritalStatus: String
// }

const AdmitSchema = mongoose.model('patient',admitSchema);

module.exports = AdmitSchema;