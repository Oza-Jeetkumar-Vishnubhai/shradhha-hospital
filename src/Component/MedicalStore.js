import React, { useEffect, useState } from 'react'
import Card from './Card';
import '../CSS/medicalStore.css'
import add from './Images/add-med.mp3'
import rem from './Images/remove.mp3'
import { is } from 'express/lib/request';

var addMed = new Audio(add);
var remMed = new Audio(rem);
function MedicalStore() {

    const [medName, setMedName] = useState([])
    const [card, setCard] = useState([])
    const [cost, setCost] = useState(0);
    useEffect(async () => {
        var data = await fetch('/medical-store-data/detailes');
        var parsedData = await data.json();
        setMedName(parsedData)
    }, [])

    const getCard = async (id, tf, ind, value) => {
        const data = await fetch(`/medical-store-data/${id}`)
        console.log(ind)
        const parsedData = await data.json();
        parsedData[0].ind = ind;
        if (tf) {
            setCost(cost + parseInt(parsedData[0]["MRP"].slice(1)))
            setCard([...card, parsedData[0]])
        }
        else
            setCost(cost - value * parseInt(parsedData[0]["MRP"].slice(1)))
    }

    const add = (id, ind) => {
        getCard(id, true, ind, 0)
        addMed.play()
    }

    const rem = (id, ind) => {
        var parent = document.getElementsByClassName('rightMed')[0];
        var value = parseInt(document.getElementById(ind).childNodes[1].childNodes[1].innerHTML);
        console.log(value, "value")
        if (document.getElementById(ind).childNodes[0].style.backgroundColor == "")
            getCard(id, false, ind, value)
        parent.childNodes[1].removeChild(document.getElementById(ind))
        remMed.play()
    }

    const search = (e) => {
        var input = e.target.value.toUpperCase();
        for (var i = 0; i < medName.length; i++) {
            if (medName[i]['Medicine Name'].toUpperCase().indexOf(input) == -1) {
                document.getElementsByClassName('lists')[i].style.display = "none"
            }
            else {
                document.getElementsByClassName('lists')[i].style.display = "block";
            }
        }
    }

    const quantity = (e, mode) => {
        var x = parseInt(e.target.parentElement.childNodes[1].innerHTML)
        if ((x >= 0 & mode == 1) || (x >= 1 & mode == -1)) {
            x += mode;
            e.target.parentElement.childNodes[1].innerHTML = x;
            var medCost = parseInt(e.target.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[2].data.slice(1))
            setCost(cost + mode * medCost)
            if (x == 0) {
                e.target.parentElement.parentElement.childNodes[0].style.backgroundColor = "red";
            }
            else
                e.target.parentElement.parentElement.childNodes[0].style.backgroundColor = "";
        }
    }

    const pay = async () => {
        console.log();
        // var y = card.filter(()=>{return document.querySelector(".row").childNodes[0].childNodes[0].style.backgroundColor==""})
        var y = card.filter((ele, ind) => { return document.querySelector(".row").childNodes[ind].childNodes[0].style.backgroundColor == "" })
        var data = [];
        y.map((ele, ind) => {
            data.push({ name: ele["Medicine Name"], cost: ele["MRP"] })
            // {name : ele["Medicine Name"],cost : ele["MRP"]}
        })
        console.log(data, "data")
        var patientInfo = prompt("Enter Bed number and Room number separated by space : ex(101 1) ").split(" ");
        var payload = { bedNo: parseInt(patientInfo[0]), roomNo: parseInt(patientInfo[1]) }
        payload.message = data;
        console.log(payload, "payload")
        var email = await fetch('/getemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        var parsedEmail = await email.json();
    }
    return (
        <div className="medical-store">
            <div className='fs-1 heading text-center'><b>Medical Store</b></div>
            <div className="blocks">
                <div className="leftMed">
                    <div className="inputs">
                        <input className="search" type="text" id="medname" onChange={search} autoComplete='OFF' placeholder="Search Medicine" />
                    </div>
                    <div className="list">
                        {
                            medName.map((ele, ind) => {
                                return <div className="lists">
                                    <input className="checkbox" type="checkbox" name="med" id="med" onClick={(e) => { e.target.checked ? add(medName[ind]["_id"], ind) : rem(medName[ind]["_id"], ind) }} />
                                    <p key={ind} className="medname text-center">{ele['Medicine Name']}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className='rightMed text' style={{ overflowX: "hidden" }}>
                    <p className='text-center fs-3'>CART</p>
                    <div className=" row">
                        {card.map((ele, ind) => {
                            return <div className="col-md-6" id={ele["ind"]}>
                                <Card medName={ele["Medicine Name"]}
                                    typeofsell={ele["Type of Sell"]}
                                    manufacturer={ele["Manufacturer"]}
                                    salt={ele["Salt"]}
                                    mrp={ele["MRP"]}
                                    uses={ele["Uses"]}
                                    alt={ele["Altername Medicines"]}
                                    sideeffect={ele["Side Effects"]}
                                    chemclass={ele["Chemical Class"]}
                                    theraclass={ele["Therapeutic Class"]}
                                    actionclass={ele["Action Class"]} />
                                <div className="amount" style={{ display: 'flex', justifyContent: 'center' }}>
                                    {console.log(document.getElementById('0'))}
                                    <b>Quantity : </b><div className="display" id={`q${ind}`}>1</div>
                                    <button onClick={(e) => quantity(e, 1)}>+</button>
                                    <button onClick={(e) => quantity(e, -1)}>-</button>
                                </div>
                            </div>

                        })}
                    </div>
                </div>
            </div>
            <div className="total text-center fs-2"><b>Total Cost : ₹{cost}/-</b><button disabled={cost == 0 ? true : false} onClick={pay}>PAY</button></div>
        </div>
    )
}

export default MedicalStore
