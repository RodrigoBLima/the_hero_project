import React from 'react'
import Logon from './pages/Logon'
import Register from './pages/Register'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'
import UpdateOng from './pages/UpdateOng'
import EditIncident from './pages/EditIncident'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile/" component={Profile} />
                <Route path="/update/profile/" component={UpdateOng} />
                <Route exact path="/edit/indicent" component={EditIncident} />
                <Route exact path="/incidents/new" component={NewIncident} />
            </Switch>

        </BrowserRouter>
    )
}