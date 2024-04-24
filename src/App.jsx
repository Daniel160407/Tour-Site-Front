import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminPanel from './components/adminpanel/AdminPanel';
import Tours from './components/Tours';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tours/adminpanel" component={AdminPanel}/>
                <Route path="/tours" component={Tours}/>
            </Switch>
        </Router>
    );
}

export default App;