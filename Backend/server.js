const express = require('express');
const app = express();
const bp = require('body-parser');
const sendMail = require("./sendMail")
app.use(bp.urlencoded({ extended: true }));
app.use(express.json())

const mdb = require('./mdb');
const AdmitSchema = require('./schema');
const MedicineSchema = require('./medicineSchema');

mdb();

app.post('/admit', (req, res) => {
    console.log(req.body);
    const data = new AdmitSchema(req.body);
    data.save();
    res.redirect('/room');
})

app.get('/api/admit', (req, res) => {
    AdmitSchema.find({}, (err, data) => {
        if (err) {
            res.send("Some Error occured : ", err);
        }
        else {
            res.send(data);
        }
    })
})

app.patch('/:id', async (req, res) => {
    await AdmitSchema.findByIdAndUpdate(req.params.id, { occupancy: false });
    var upData = await AdmitSchema.findById(req.params.id);
    res.send(upData);
})

app.get('/medical-store-data/:id', async (req, res) => {
    var data;
    if (req.params.id === "detailes") {
        console.log("id")
        data = await MedicineSchema.find({}, { "Medicine Name": 1, "_id": 1 });
    }
    else {
        data = await MedicineSchema.find({ "_id": req.params.id });
    }
    res.send(data)
})

app.post('/getemail', async (req, res) => {
    req.body.occupancy = true;
    var { roomNo, bedNo, occupancy } = req.body;
    var data = await AdmitSchema.find({ roomNo, bedNo, occupancy })
    console.log(data, "data");
    sendMail(data[0].email,req.body.message)
    // res.send({status : "OK"})
    res.redirect('/room');
})

app.listen(8000, () => {
    console.log("server is running on http://localhost:8000");
})