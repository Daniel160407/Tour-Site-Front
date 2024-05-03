import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminPanel from './components/adminpanel/AdminPanel';
import Tours from './components/Tours';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tours" component={Tours} />
                <Route path="/adminpanel" component={AdminPanel} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;