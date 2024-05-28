import React, { useState } from 'react';
import '../style/navbar.scss';

const Navbar = ({adminMode, setGlobalSearchText }) => {
    const [searchText, setSearchText] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            setGlobalSearchText(event.target.value);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-grid justify-content-center">
                <ul className="nav nav-tabs">
                    <li className="nav-item" key="home">
                        <a className="nav-link active" data-toggle="tab" href="#home">Home</a>
                    </li>
                    <li className="nav-item" key="contact">
                        <a className="nav-link" data-toggle="tab" href="#contact">Contact</a>
                    </li>
                    <li className="nav-item" key="feedbacks">
                        <a className="nav-link" data-toggle="tab" href="#feedbacks">Feedbacks</a>
                    </li>
                    {adminMode && (
                        <li className="nav-item" key="statistics">
                            <a className="nav-link" data-toggle="tab" href="#statistics">Statistics</a>
                        </li>
                    )}
                </ul>
                <div className="navbar-brand">
                    <span className="title">Georgia & Tours</span>
                </div>
                <div id="search">
                    <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
                        <rect className="bar" />
                        <g className="magnifier">
                            <circle className="glass" />
                            <line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
                        </g>
                        <g className="sparks">
                            <circle className="spark" />
                            <circle className="spark" />
                            <circle className="spark" />
                        </g>
                        <g className="burst pattern-one">
                            <circle className="particle circle" />
                            <path className="particle triangle" />
                            <circle className="particle circle" />
                            <path className="particle plus" />
                            <rect className="particle rect" />
                            <path className="particle triangle" />
                        </g>
                        <g className="burst pattern-two">
                            <path className="particle plus" />
                            <circle className="particle circle" />
                            <path className="particle triangle" />
                            <rect className="particle rect" />
                            <circle className="particle circle" />
                            <path className="particle plus" />
                        </g>
                        <g className="burst pattern-three">
                            <circle className="particle circle" />
                            <rect className="particle rect" />
                            <path className="particle plus" />
                            <path className="particle triangle" />
                            <rect className="particle rect" />
                            <path className="particle plus" />
                        </g>
                    </svg>
                    <input type="search" placeholder='Search' name="q" aria-label="Search for inspiration" onKeyPress={handleKeyPress} onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                </div>
                <div>
                    <select id="language">
                        <option>ENG</option>
                        <option>RUS</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
