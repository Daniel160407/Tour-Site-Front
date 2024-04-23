import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import '/src/index.scss';
import Tabs from './components/Tabs';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <Navbar/>
      <Tabs/>
    </>
);