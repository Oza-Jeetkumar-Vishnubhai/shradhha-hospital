import React,{useEffect} from 'react'
import '../CSS/bed.css'
import male from './Images/male patient.png'
import female from './Images/female patient.png'
import baby from './Images/baby patient.png'
// import alarm from './Images/alert.wav'
import { useHistory } from 'react-router'

export default function Bed(props) {
    // var alert = new Audio(alarm);
    const history = useHistory();
    const gen={male:male,female:female};
    const discharge = async (id)=>{
        const options = {
            method:"PATCH",
            headers:{"Content-Type":"application/json"}
        }
        var data = await fetch(`/${id}`,options);
        var parsedData = await data.json();
        console.log("deleted : ",parsedData);
        
        history.push({
            pathname:'/discharge',
            state:{delData : parsedData}
        });

        window.location.href="/discharge";//try to comment this line
    }
    return (
        <>
        <div className="full-bed">
            <div className="left">
                <div className="machine text-center"><b>Temp</b> {props.occupancy?props.machineData.temp.toFixed(2):"---"}</div>
                <div className="machine-b machine text-center"><b>Respiratory Rate</b> {props.occupancy?props.machineData.respRate.toFixed(2):"---"}</div>
            </div>
            {/* style={{display: props.occupancy?"block":"none"}} */}
            <div className="bed text-center" style={{border:props.alarm && props.occupancy?"4px solid red":"2px solid black"}}>
                <b>{props.bedno}</b>
                <p style={{display: props.occupancy?"":"none"}}>{props.name}</p>
                <img src={gen[props.gender]} alt={props.gender} height="250px" width="200px" style={{display: props.occupancy?"":"none"}}/>
            </div>
            <div className="right">
                <div className="machine text-center"><b>Heart Beats</b> {props.occupancy?props.machineData.heartBeat.toFixed(2):"---"}</div>
                <div className="machine-b machine text-center"><b>O2 saturation</b> {props.occupancy?props.machineData.o2Saturation.toFixed(2):"---"}</div>
            </div>
        </div>
        <button className="discharge text-center" onClick={()=>{discharge(props.id)}} disabled={!props.occupancy}>
            <p><b className="h5">Discharge</b></p>
        </button>
        </>
    )
}
