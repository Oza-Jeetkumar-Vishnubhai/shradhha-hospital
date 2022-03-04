import React from 'react'
import Admit from './Component/Admit'
import Room from './Component/Room'
import Home from './Component/Home'
import Discharge from './Component/Discharge'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MedicalStore from './Component/MedicalStore'

export default function App() {
  return (
    <div style={{"height":"100vh"}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/room">
            <Room />
          </Route>
          <Route exact path="/admit">
            <Admit />
          </Route>
          <Route exact path="/discharge">
            <Discharge/>
          </Route>
          <Route exact path="/medical-store">
            <MedicalStore/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
