import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminPanel from './components/adminpanel/AdminPanel';
import Tours from './components/Tours';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tours/adminpanel" component={AdminPanel}/>
                <Route path="/tours" component={Tours}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;