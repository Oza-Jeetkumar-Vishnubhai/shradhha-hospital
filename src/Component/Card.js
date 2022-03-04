import React from 'react'

function Card(props) {
    return (
        <div className="cards" id={props.id}>
            {console.log(props.id,"props")}
            <p className="text-center">{props.medName}</p>
            {/* <p><span style={{"color":"blue"}}>Medicine Name</span> : {props.medName}</p> */}
            <p><span style={{"color":"blue"}}>MRP</span> : {props.mrp}</p>
            <p><span style={{"color":"blue"}}>Uses</span> : {props.uses}</p>
            <p><span style={{"color":"blue"}}>Manufacturer</span> : {props.manufacturer}</p>
            <p><span style={{"color":"blue"}}>Type of sell</span> : {props.typeofsell}</p>
            <p><span style={{"color":"blue"}}>Sideeffects</span> : {props.sideeffect}</p>
            <p><span style={{"color":"blue"}}>Chemical Class</span> : {props.chemclass}</p>
            <p><span style={{"color":"blue"}}>Therapeutic Class</span> : {props.theraclass}</p>
            <p><span style={{"color":"blue"}}>Action Class</span> : {props.actionclass}</p>
        </div>
    )
}

export default Card
