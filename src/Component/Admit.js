import React from 'react'
import '../CSS/admit.css'
import { useLocation } from 'react-router';

export default function Admit() {
    
    const jeet = async ()=>{
        await fetch('/admit',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:"jeet",surname:"oza"})
        })
    }
    const submit = ()=>{
        alert("Patient has been admitted");
    }
    const location = useLocation();
    return (
        <div className="admit-body">
            {/* <button onClick={jeet}>Click</button> */}
            {/* <form method="POST">
                <button type='submit'>click</button>
            </form> */}
            <div className="frm container">
                <form method="POST">
                    <table cellPadding="10">
                        <tr>
                            <td>
                                Room No :
                            </td>
                            <td>
                                <input type="number" name="roomNo" value={location.state.roomNo} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Bed No :
                            </td>
                            <td>
                                <input type="number" name="bedNo" value={location.state.bedNo} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Patient Name :
                            </td>
                            <td>
                                <input type="text" name="fname" placeholder="First Name" />
                                <input type="text" name="lname" placeholder="Last Name" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Address :
                            </td>
                            <td style={{display:'flex'}}>
                                <div>
                                    <textarea name="address" id="address" cols="30" rows="3" placeholder="Address "></textarea><br />
                                    <sup>Street Address</sup>
                                </div>
                                <div>
                                    <input type="text" name="state" placeholder="state" /><br />
                                    <sup>State</sup> <br />
                                </div>
                                <div>
                                    <input type="text" name="city" placeholder="city" /><br />
                                    <sup>City</sup> <br />
                                </div>
                                <div>
                                    <input type="number" name="pincode" id="pincode" placeholder="pincode" /><br />
                                    <sup>Pincode</sup><br />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Phone Number :
                            </td>
                            <td>
                                <input type="number" name="phone" id="phone" placeholder="phone-number" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email-address :
                            </td>
                            <td>
                                <input type="email" name="email" id="email" placeholder="email" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sex :
                            </td>
                            <td>
                                <select name="sex" id="sex">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Marital Status :
                            </td>
                            <td>
                                <select name="maritalStatus" id="marital">
                                    <option value="married">Married</option>
                                    <option value="single">Single</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="hidden" name="occupancy" value="true" />
                                <input type="submit" value="Submit" onClick={submit} />
                            </td>
                            <td>
                                <input type="reset" value="Reset" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    )
}
