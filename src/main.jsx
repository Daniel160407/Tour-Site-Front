import React from 'react';
import ReactDOM from 'react-dom/client';
import Place from './components/Place.jsx';
import Navbar from './components/Navbar.jsx';
import root from './root.js';

ReactDOM.createRoot(document.getElementById('header')).render(
  <React.StrictMode>
    <Navbar/>
  </React.StrictMode>
);

root.render(
<React.StrictMode>
    <Place place={"Tbilisi"}/>
    <Place place={"Qutaisi"}/>
    <Place place={"Vardzia"}/>
  </React.StrictMode>
);