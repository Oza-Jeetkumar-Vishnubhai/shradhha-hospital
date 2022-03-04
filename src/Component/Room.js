import React, { useEffect, useState } from 'react'
import Bed from './Bed'
import doorAudio from './Images/door.mp3'
import { useHistory } from 'react-router-dom';

// male-0
// female-1
// baby-2

export default function Room() {

    var door = new Audio(doorAudio);
    const exit = ()=>{
        setTimeout(()=>window.location.href="/",850);
        door.play();
    }
    const medicalStore = ()=>{
        setTimeout(()=>window.location.href="/medical-store",850);
    }
    const history = useHistory();

    const [data, setData] = useState([]);
    var bn = 101;
    const linking = () => {
        for (var i = 1; i < 5; i++) {
            if (i + 100 != data[i - 1]?.bedNo) {
                bn = i + 100;
                break;
            }
        }
        if (data.length == 4) {
            alert("Beds are full !! Cannot Admit the patient");
            return;
        }
        console.log(bn);
        history.push({
            pathname: '/admit',
            state: { roomNo: 1, bedNo: `${bn}` }
        });
    }
    const fdata = async () => {
        var fetchedData = await fetch('/api/admit');
        var parsedData = await fetchedData.json();
        var validData = parsedData.filter((ele) => {
            if (ele.occupancy)
                return ele;
        });
        validData.sort((a, b) => {
            return a.bedNo - b.bedNo;
        })

        setData(validData);
    }
    useEffect(() => {
        fdata();
    }, [])
    const machineData = () => {
        return {
            temp: Math.random() * (105 - 96) + 96,
            respRate: Math.random() * (25 - 12) + 12,
            heartBeat: Math.random() * (125 - 40) + 40,
            o2Saturation: Math.random() * (100 - 85) + 85,
        }
    };
    const [mdata, setMdata] = useState([machineData(), machineData(), machineData(), machineData()]);
    const [alarm, setAlarm] = useState([false,false,false,false]);
    useEffect(() => {
        setTimeout(() => {
            console.log("data changed");
            setMdata([machineData(), machineData(), machineData(), machineData()]);
        }, 10000);
    }, [mdata])
    useEffect(() => {
        for(var i=0;i<4;i++)
        {
            
            if(mdata[i].temp>101 || mdata[i].respRate>23 || mdata[i].respRate<15 || mdata[i].heartBeat>90 || mdata[i].heartBeat<60 || mdata[i].o2Saturation<90)
            {
                alarm[i]=true;
            } 
            else
            {
                alarm[i]=false;
            }
        }
    }, [mdata]);
    return (
        <div className="floor">
            <div className="row">
                <div className="col">
                    <Bed id={data[0]?._id} name={data[0]?.fname + " " + data[0]?.lname} bedno={data[0]?.bedNo} occupancy={data[0]?.occupancy} gender={data[0]?.sex} machineData={mdata[0]} alarm={alarm[0]} />
                </div>
                <div className="col">
                    <Bed id={data[1]?._id} name={data[1]?.fname + " " + data[1]?.lname} bedno={data[1]?.bedNo} occupancy={data[1]?.occupancy} gender={data[1]?.sex} machineData={mdata[1]} alarm={alarm[1]} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Bed id={data[2]?._id} name={data[2]?.fname + " " + data[2]?.lname} bedno={data[2]?.bedNo} occupancy={data[2]?.occupancy} gender={data[2]?.sex} machineData={mdata[2]} alarm={alarm[2]} />
                </div>
                <div className="col">
                    <Bed id={data[3]?._id} name={data[3]?.fname + " " + data[3]?.lname} bedno={data[3]?.bedNo} occupancy={data[3]?.occupancy} gender={data[3]?.sex} machineData={mdata[3]} alarm={alarm[3]} />
                </div>
            </div>
            <div className="footer">
                <div className="door text-center fs-3" onClick={exit}>
                    <b>Exit</b>
                </div>
                <div className="admit text-center fs-3" onClick={linking}>
                    {/* <Link to="/admit"><b>Admit Patient</b></Link> */}
                    <b>Admit Patient</b>
                </div>
                <div className="door text-center fs-3" onClick={medicalStore}>
                    <b>Medical Store</b>
                </div>
            </div>
        </div>
    )
}

