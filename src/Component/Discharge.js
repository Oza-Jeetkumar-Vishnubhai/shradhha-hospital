import React from 'react'
import { useLocation } from 'react-router'

export default function Discharge() {
    const location = useLocation();
    return (
        <div>
            <p>discharge page of {location.state.delData.fname}</p>
            
        </div>
    )
}
